<?php
require_once ("../includes/modele.inc.php");
session_start();
$tabRes = array();

function ficheFormSortReservations()
{
    global $tabRes;

    $tabRes['action'] = "ficheformsortreservations";
    $arrayOfChambres = array();
    try {
        $requet = "SELECT idch, CONCAT(type_chambres.type_chambre,' ',animaux.type_animal) as chambre FROM type_chambres, animaux, chambres WHERE type_chambres.idtch = chambres.idtch AND animaux.idan = chambres.idan ORDER BY chambre";
        $unModele = new generalModele($requet, array());
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfChambres[] = $ligne;
        }
        $tabRes["chambres"] = $arrayOfChambres;
        $tabRes['msg'] = "";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function findReservationsByParameters()
{
    global $tabRes;
    $tabRes['action'] = "byparameters";
    $resultArray=array();
    $parameters=array();
    $query = "SELECT idr, date_debut, date_fin, CONCAT(type_chambres.type_chambre,' ',animaux.type_animal) as chambre, annule, username, prix FROM type_chambres, animaux, chambres, users, reservations WHERE type_chambres.idtch = chambres.idtch AND animaux.idan = chambres.idan AND users.idu = reservations.idu AND reservations.idch=chambres.idch";
    if (isset($_POST["date_begin"]) && !empty($_POST["date_begin"])) {
        $parameters[]=$_POST['date_begin'];
        $query .= " AND date_fin>=? ";
    }
    if (isset($_POST["date_end"]) && !empty($_POST["date_end"])) {
        $parameters[]=$_POST['date_end'];
        $query .= " AND date_debut<=? ";
    }
    if (isset($_POST["idch"]) && !empty($_POST["idch"]) && ($_POST["idch"] != 0)) {
        $parameters[]=$_POST['idch'];
        $query .= " AND chambres.idch=? ";
    }
    if (isset($_POST["annule"]) && !empty($_POST["annule"]) && ($_POST["annule"] != 3)) {
        $parameters[]=$_POST['annule']-1;
        $query .= " AND annule=? ";
    }
    if (isset($_POST["login"]) && !empty($_POST["login"])) {
        $parameters[]="%".$_POST['login']."%";
        $query .= " AND username LIKE ? ";
    }
    $query .= " ORDER BY date_debut";
    try {
        $unModele = new generalModele($query, $parameters);
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $resultArray[] = $ligne;
        }
        $tabRes["reservations"] = $resultArray;
        $tabRes['msg'] = "";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function afficherReservation(){
    global $tabRes;
    $tabRes['action'] = "afficherReservation";
    $reservations=array();
    $services=array();
    $idr=$_POST['idr'];
    try {
        $requet = "SELECT reservations.idr, CONCAT('Chambre ',type_chambres.type_chambre,' pour les ',animaux.type_animal,'s') as chambre,
        date_debut, date_fin, prix,exigences, annule, membres.nom, membres.prenom, membres.phone
        FROM type_chambres, animaux, chambres, reservations, membres
        WHERE type_chambres.idtch = chambres.idtch
        AND animaux.idan = chambres.idan
        AND chambres.idch=reservations.idch
        AND reservations.idu=membres.idu
        AND reservations.idr=?";
        $unModele = new generalModele($requet, array($idr));
        $stmt = $unModele->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);
        $reservations[] = $ligne;
        $tabRes["reservation"] = $reservations;
        $requet="SELECT services.nom_service, reserv_service.prix_service, reserv_service.count_service, reserv_service.`exig-serv` as exig_serv from services, reserv_service, reservations WHERE services.ids=reserv_service.ids AND reservations.idr=reserv_service.idr AND reservations.idr=? ORDER BY nom_service";
        $unModele = new generalModele($requet, array($idr));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $services[] = $ligne;
        }
        $tabRes['services']=$services;
        $tabRes['msg'] = "";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function annulerReservation(){
    global $tabRes;
    $idr =$_POST['idr'];
    $tabRes['idr']=$idr;
    $tabRes['action'] = "annuler";
    try {
        $requet = "UPDATE reservations SET annule=1 WHERE idr=?";
        $unModele = new generalModele($requet, array($idr));
        $stmt = $unModele->executer();
        $tabRes['msg'] = "";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

// ******************************************************
// Controleur
$action = $_POST['action'];
switch ($action) {
    case "ficheformsortreservations":
        ficheFormSortReservations();
        break;
    case "byparameters":
        findReservationsByParameters();
        break;
    case "afficherReservation":
        afficherReservation();
        break;
    case "annuler":
        annulerReservation();
        break;
}
echo json_encode($tabRes);
?>
