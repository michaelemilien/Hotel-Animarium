<?php
require_once ("../includes/modele.inc.php");
session_start();
$tabRes = array();

function ficheAjouterChambre(){
    global $tabRes;

    $tabRes['action'] = "ficheajoutechambre";
    $arrayOfTypeChambre = array();
    $arrayOfTypeAnimaux = array();
    try{
        $requet = "SELECT * FROM animaux";
        $unModele = new generalModele($requet, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfTypeAnimaux[] = $ligne;
        }
        $requet = "SELECT * FROM type_chambres";
        $unModele = new generalModele($requet, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfTypeChambre[] = $ligne;
        }
        $tabRes["animaux"] = $arrayOfTypeAnimaux;
        $tabRes["chambres"] = $arrayOfTypeChambre;
        $tabRes['msg'] = "";
    }catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function enregistrerChambre(){
    global $tabRes;
    $tabRes['action'] = "enregistrer";
    $idtch = $_POST['idtch'];
    $idan = $_POST['idan'];
    $descr = $_POST['desc_chambre'];
    $places =$_POST['places'];
    $jour = $_POST['prix_jour'];
    $semain = $_POST['prix_semaine'];
    $mois = $_POST['prix_mois'];

    $dossier = "images/chambres";
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
    try {
        $requet = "SELECT CONCAT('Chambre ',type_chambre,' pour les ', type_animal,'s') as nom_album FROM type_chambres,animaux WHERE idtch = ? AND idan = ?";
        $unModele = new generalModele($requet, array($idtch, $idan));
        $stmt = $unModele->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);
        $nom_album = $ligne->nom_album;
        $requete = "INSERT INTO albums VALUES(0,?)";
        $unModele = new generalModele($requete, array(
            $nom_album
        ));
        $albumId = $unModele->executerAndGetId();

        $requete = "INSERT INTO chambres VALUES(0,?,?,?,?,?,?,?,?)";
        $unModele = new generalModele($requete, array(
            $descr,
            $jour,
            $semain,
            $mois,
            $places,
            $albumId,
            $idan,
            $idtch
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
        $tabRes['msg'] = "Chambre est bien enregistre";
    } catch (Exception $e) {
        $tabRes['err'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }



}

function listerChambres(){
    global $tabRes;
    $arrayOfResult = array();
    try {
        $requete = "SELECT idch, places, nom_album, images.ida, fichier, dossier, descr_img FROM chambres, images, albums WHERE chambres.ida=images.ida AND chambres.ida=albums.ida ORDER BY idch";
        $unModele = new generalModele($requete, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $tabRes['chambres'] = $arrayOfResult;
        $tabRes['action'] = "lister";
        $tabRes['msg'] = "ok";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function enleverChambre(){
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
        $requet = "DELETE FROM chambres WHERE ida = ?";
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

function afficheCahmbre(){
    global $tabRes;
    $idch = $_POST['idch'];
    $tabRes['action'] = "afficheChambre";
    $arrayOfResult = array();
    $arrayOfTypeChambre = array();
    $arrayOfTypeAnimaux = array();
    try{
        $requet = "SELECT idch, nom_album, desc_chambre, prix_jour, prix_semaine, prix_mois, places, images.ida, idi, fichier, dossier, descr_img, idan, idtch FROM chambres, images, albums WHERE chambres.ida=images.ida AND albums.ida=chambres.ida AND idch=?";
        $unModele = new generalModele($requet, array($idch));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }

        $requet = "SELECT * FROM animaux";
        $unModele = new generalModele($requet, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfTypeAnimaux[] = $ligne;
        }
        $requet = "SELECT * FROM type_chambres";
        $unModele = new generalModele($requet, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfTypeChambre[] = $ligne;
        }
        $tabRes["t_animaux"] = $arrayOfTypeAnimaux;
        $tabRes["t_chambres"] = $arrayOfTypeChambre;
        $tabRes["chambre"] = $arrayOfResult;
        $tabRes['idch']=$idch;
        $tabRes['msg'] = "";
    }catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function enleverImageChambre(){
    global $tabRes;
    $idi = $_POST['idi'];
    $tabRes['idch'] = $_POST['idch'];
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

function updateChambre(){
    global $tabRes;
    $ida = $_POST['ida'];
    $idch = $_POST['idch'];
    $descr = $_POST['desc_chambre'];
    $places = $_POST['places'];
    $prix_jour = $_POST['prix_jour'];
    $prix_semaine = $_POST['prix_semaine'];
    $prix_mois = $_POST['prix_mois'];
    $tabRes['action'] = "updatechambre";
    $tabRes['idch'] = $idch;
    $dossier = "images/chambres";
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
        $requete = "UPDATE chambres SET desc_chambre=?, prix_jour=?, prix_semaine=?, prix_mois=?, places=? WHERE idch=?";
        $unModele = new generalModele($requete, array($descr, $prix_jour, $prix_semaine, $prix_mois, $places, $idch));
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
        $tabRes['msg'] = "Chambre mise à jour avec succès";
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
    case "ficheajoutechambre":
        ficheAjouterChambre();
        break;
    case "enregistrer":
        enregistrerChambre();
        break;
    case "lister":
        listerChambres();
        break;
    case "enlever":
        enleverChambre();
        break;
    case "fiche":
        afficheCahmbre();
        break;
    case "enleverimage":
        enleverImageChambre();
        break;
    case "update" :
        updateChambre();
        break;
}
echo json_encode($tabRes);
?>
