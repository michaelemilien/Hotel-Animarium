<?php
require_once ("../includes/modele.inc.php");
session_start();
$tabRes = array();

function enregistrer()
{
    global $tabRes;
    $dossier = "images/galeries";
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
    $nom_galery = $_POST['nom_galery'];

    try {

        $requete = "INSERT INTO albums VALUES(0,?)";
        $unModele = new generalModele($requete, array(
            $nom_galery
        ));
        $albumId = $unModele->executerAndGetId();

        $requete = "INSERT INTO galeries VALUES(0,?,?)";
        $unModele = new generalModele($requete, array(
            $nom_galery,
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
        $tabRes['msg'] = "Galerie est bien enregistre";
    } catch (Exception $e) {
        $tabRes['err'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function listerGaleries()
{
    global $tabRes;
    $arrayOfResult = array();
    try {
        $requete = "SELECT idg, nom_galeries, images.ida, idi, fichier, dossier, descr_img FROM galeries, images WHERE galeries.ida=images.ida ORDER BY idg";
        $unModele = new generalModele($requete, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $tabRes["galeries"] = $arrayOfResult;
        $tabRes['action'] = "lister";
        $tabRes['msg'] = "ok";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function enleverGalery()
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
        $requet = "DELETE FROM galeries WHERE ida = ?";
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

function afficheGalery(){
    global $tabRes;
    $idg = $_POST['idg'];
    $tabRes['action'] = "afficheGalery";
    $arrayOfResult = array();
    try{
        $requet = "SELECT idg, nom_galeries, images.ida, idi, fichier, dossier, descr_img FROM galeries, images WHERE galeries.ida=images.ida AND idg=?";
        $unModele = new generalModele($requet, array($idg));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $requet = "SELECT ida FROM galeries WHERE idg=?";
        $unModele = new generalModele($requet, array($idg));
        $stmt = $unModele->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);
        $tabRes['ida']=$ligne->ida;
        $tabRes["galerie"] = $arrayOfResult;
        $tabRes['idg']=$idg;
        $tabRes['msg'] = "";
    }catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function enleverImageGalery(){
    global $tabRes;
    $idi = $_POST['idi'];
    $tabRes['idg'] = $_POST['idg'];
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

function updateGalery(){
    global $tabRes;
    $ida = $_POST['ida'];
    $idg = $_POST['idg'];
    $nom_galery = $_POST['nom_galery'];
    $tabRes['action'] = "updategalerie";
    $tabRes['idg'] = $idg;
    $dossier = "images/galeries";
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
    $nom_galery = $_POST['nom_galery'];
    try {
        $requete = "UPDATE albums SET nom_album=? WHERE ida=?";
        $unModele = new generalModele($requete, array($nom_galery, $ida));
        $stmt = $unModele->executer();

        $requete = "UPDATE galeries SET nom_galeries=? WHERE idg=?";
        $unModele = new generalModele($requete, array(
            $nom_galery,
            $idg
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
        $tabRes['msg'] = "Galerie mise à jour avec succès";
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
    case "lister":
        listerGaleries();
        break;
    case "enlever":
        enleverGalery();
        break;
    case "fiche":
        afficheGalery();
        break;
    case "enleverimage" :
        enleverImage();
        break;
    case "update":
        updateGalery();
        break;
}
echo json_encode($tabRes);
?>
