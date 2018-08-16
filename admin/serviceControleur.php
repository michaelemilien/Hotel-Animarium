<?php
require_once ("../includes/modele.inc.php");
session_start();
$tabRes = array();

function enregistrer()
{
    global $tabRes;
    $dossier = "images/services";
    $tabl_supl = array();
    $tabl_supl["nom"] = array();
    $tabl_supl["new_nom"] = array();
    $tabl_supl["descr"] = array();
    foreach ($_FILES["images"]["name"] as $imageName) {
        $tabl_supl["nom"][] = $imageName;
    }
    $mass_size = sizeof($tabl_supl["nom"]);
    $nom_descr = "";
    for ($i = 0; $i < $mass_size; $i ++) {
        $nom_descr = "descr-" . str_replace(".", "_", $tabl_supl["nom"][$i]);
        $tabl_supl["descr"][$i] = $_POST[$nom_descr];
    }
    $nom_service = $_POST['nom_service'];
    $descr_service = $_POST['descr_service'];
    $prix_service = $_POST['prix_service'];
    try {
        $requete = "INSERT INTO albums VALUES(0,?)";
        $unModele = new generalModele($requete, array(
            $nom_service
        ));
        $albumId = $unModele->executerAndGetId();

        $requete = "INSERT INTO services VALUES(0,?,?,?,?)";
        $unModele = new generalModele($requete, array(
            $nom_service,
            $descr_service,
            $prix_service,
            $albumId
        ));
        $unModele->executer();
        if ($_FILES['images']['name'][0]!=""){
            $unModele = new generalModele();
            $tabl_supl = $unModele->verserFichiers($dossier, "images", $tabl_supl);

            for ($j = 0; $j < $mass_size; $j ++) {
                $requete = "INSERT INTO images VALUES(0,?,?,?,?)";
                $unModele = new generalModele($requete, array(
                    $tabl_supl["new_nom"][$j],
                    $dossier,
                    $tabl_supl["descr"][$j],
                    $albumId
                ));
                $unModele->executer();
            }
        }

        $tabRes['action'] = "enregistrer";
        $tabRes['err'] = "";
        $tabRes['msg'] = "Service est bien enregistre";
    } catch (Exception $e) {
        $tabRes['err'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function listerServices()
{
    global $tabRes;
    $arrayOfResult = array();
    try {
        $requete = "SELECT ids, nom_service, descr_service, prix_service, images.ida, idi, fichier, dossier, descr_img FROM services, images WHERE services.ida=images.ida ORDER BY ids";
        $unModele = new generalModele($requete, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $tabRes["services"] = $arrayOfResult;
        $tabRes['action'] = "lister";
        $tabRes['msg'] = "ok";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function enleverService()
{
    global $tabRes;
    $ida = $_POST['ida'];
    try {
        $requet = "SELECT dossier, fichier FROM `images` WHERE ida=?";
        $unModele = new generalModele($requet, array(
            $ida
        ));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $unModele->enleverFichier($ligne->dossier, $ligne->fichier);
        }
        $requet = "DELETE FROM images WHERE ida = ?";
        $unModele = new generalModele($requet, array(
            $ida
        ));
        $stmt = $unModele->executer();
        $requet = "DELETE FROM albums WHERE ida = ?";
        $unModele = new generalModele($requet, array(
            $ida
        ));
        $stmt = $unModele->executer();
        $requet = "DELETE FROM services WHERE ida = ?";
        $unModele = new generalModele($requet, array(
            $ida
        ));
        $stmt = $unModele->executer();
        $tabRes['action'] = "enlever";
        $tabRes['msg'] = "ok";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}


function afficheService(){
    global $tabRes;
    $ids = $_POST['ids'];
    $tabRes['action'] = "afficheService";
    $arrayOfResult = array();
    try{
        $requet = "SELECT ids, nom_service, descr_service, prix_service, images.ida, idi, fichier, dossier, descr_img FROM services, images WHERE services.ida=images.ida AND ids=?";
        $unModele = new generalModele($requet, array($ids));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $requet = "SELECT ida FROM services WHERE ids=?";
        $unModele = new generalModele($requet, array($ids));
        $stmt = $unModele->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);
        $tabRes['ida']=$ligne->ida;
        $tabRes["service"] = $arrayOfResult;
        $tabRes['ids']=$ids;
        $tabRes['msg'] = "";
    }catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function enleverImageService(){
    global $tabRes;
    $idi = $_POST['idi'];
    $tabRes['ids'] = $_POST['ids'];
    $tabRes['action'] = "enleverimage";
    try {
        $requet = "SELECT dossier, fichier FROM `images` WHERE idi=?";
        $unModele = new generalModele($requet, array(
            $idi
        ));
        $stmt = $unModele->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);
        $unModele->enleverFichier($ligne->dossier, $ligne->fichier);

        $requet = "DELETE FROM images WHERE idi = ?";
        $unModele = new generalModele($requet, array(
            $idi
        ));
        $stmt = $unModele->executer();
        $tabRes['msg'] = "";
    }catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function updateService(){
    global $tabRes;
    $ida = $_POST['ida'];
    $ids = $_POST['ids'];
    $nom_service = $_POST['nom_service'];
    $descr_service = $_POST['descr_service'];
    $prix_service = $_POST['prix_service'];
    $tabRes['action'] = "updateservice";
    $tabRes['ids'] = $ids;
    $dossier = "images/services";
    $tabl_supl = array();
    $tabl_supl["nom"] = array();
    $tabl_supl["new_nom"] = array();
    $tabl_supl["descr"] = array();
    foreach ($_FILES["images"]["name"] as $imageName) {
        $tabl_supl["nom"][] = $imageName;
    }
    $mass_size = sizeof($tabl_supl["nom"]);

    $nom_descr = "";
    if ($_FILES['images']['name'][0]!=""){
        for ($i = 0; $i < $mass_size; $i ++) {
            $nom_descr = "descr-" . str_replace(".", "_", $tabl_supl["nom"][$i]);
            $tabl_supl["descr"][$i] = $_POST[$nom_descr];
        }
    }
    try {
        $requete = "UPDATE albums SET nom_album=? WHERE ida=?";
        $unModele = new generalModele($requete, array($nom_service, $ida));
        $stmt = $unModele->executer();

        $requete = "UPDATE services SET nom_service=?, descr_service=?, prix_service=?  WHERE ids=?";
        $unModele = new generalModele($requete, array(
            $nom_service,
            $descr_service,
            $prix_service,
            $ids
        ));
        $stmt = $unModele->executer();
        if ($_FILES['images']['name'][0]!=""){
            $unModele = new generalModele();
            $tabl_supl = $unModele->verserFichiers($dossier, "images", $tabl_supl);
            for ($j = 0; $j < $mass_size; $j ++) {
                $requete = "INSERT INTO images VALUES(0,?,?,?,?)";
                $unModele = new generalModele($requete, array(
                    $tabl_supl["new_nom"][$j],
                    $dossier,
                    $tabl_supl["descr"][$j],
                    $ida
                ));
                $unModele->executer();
            }
        }
        $tabRes['msg'] = "Service mise à jour avec succès";
    }catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}


// ******************************************************
// Controleur
$action = $_POST['action'];
switch ($action) {
    case "enregistrer":
        enregistrer();
        break;
    case "lister" :
        listerServices();
        break;
    case "enlever" :
        enleverService();
        break;
    case "fiche":
        afficheService();
        break;
    case "enleverimage" :
        enleverImageService();
        break;
    case "update":
        updateService();
        break;
}
echo json_encode($tabRes);
?>
