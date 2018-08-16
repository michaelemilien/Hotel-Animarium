<?php
require_once ("../includes/modele.inc.php");
session_start();
$tabRes = array();

function listerTemoignages()
{
    global $tabRes;
    $arrayOfResult = array();
    try {
        $requete = "SELECT `idt`, `rating`, `descr_temoign`, `date_temoign`, `afficher`, `ida`, `idr` FROM `temoignage`";
        $unModele = new generalModele($requete, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $tabRes["temoin"] = $arrayOfResult;
        $tabRes['action'] = "lister";
        $tabRes['msg'] = "ok";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function afficheTemoin(){
    global $tabRes;
    $idt = $_POST['idt'];
    $ida = $_POST['ida'];
    $idr = $_POST['idr'];
    $tabRes['action'] = "affichetemoin";
    $user=array();
    $images=array();
    $temoin=array();
    try{
        $requet = "SELECT nom, prenom, email, phone, users.idu FROM membres, users, reservations WHERE membres.idu=users.idu AND users.idu=reservations.idu AND idr=?";
        $unModele = new generalModele($requet, array($idr));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $user[] = $ligne;
        }

        $requet = "SELECT dossier, fichier, descr_img FROM `images` WHERE ida=?";
        $unModele = new generalModele($requet, array(
            $ida
        ));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $images[] = $ligne;
        }

        $requet = "SELECT * FROM temoignage WHERE idt=?";
        $unModele = new generalModele($requet, array(
            $idt
        ));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $temoin[] = $ligne;
        }

        $tabRes["user"] = $user;
        $tabRes["images"] = $images;
        $tabRes["temoin"] = $temoin;
        $tabRes['msg'] = "";
    }catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function modifierTemoignage(){
    global $tabRes;
    $idt = $_POST['idt'];
    $reponse = $_POST['reponse'];
    $affiche = $_POST['affiche'];
    $tabRes['action'] = "update";
    try {
        $requete = "UPDATE temoignage SET reponse=?, date_reponse=?, afficher=?  WHERE idt=?";
        $unModele = new generalModele($requete, array($reponse, date('Y-m-d'),$affiche,$idt));
        $stmt = $unModele->executer();
        $tabRes['msg'] = "Temoignage mise à jour avec succès";
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
    case "lister" :
        listerTemoignages();
        break;
    case "fiche" :
        afficheTemoin();
        break;
    case "modifier" :
        modifierTemoignage();
        break;

}
echo json_encode($tabRes);
?>
