<?php
session_start();
$tabRes=array();
require_once("../includes/modele.inc.php");

function enregistrerReservation(){
    global $tabRes;
    $idu = $_SESSION['userid'];
    $tabRes['action']="enregistrer";
    $date_debut = $_POST['date_debut'];
    $date_fin = $_POST['date_fin'];
    $idch = $_POST['type_chambre'];
    $exigences = $_POST['exigences'];
    $prix_r = $_POST['prix_reservation'];
    $prix_s = $_POST['prix_services'];
    $tabRes["prix_r"]=$prix_r;
    $tabRes["prix_s"]=$prix_s;
    $idr;
    $all_services;

    $services_for_saving=array(
        "ids" => array(),
        "nombre" => array(),
        "prix" => array()
    );


    try{
        $requete = "SELECT ids, nom_service, prix_service FROM services";
        $unModel= new generalModele($requete, array());
        $stmt = $unModel->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $all_services[] = $ligne;
        }
        for ($i = 0; $i < sizeof($all_services); $i++){
            if( isset($_POST['s-'.($all_services[$i]->ids)])){
                $services_for_saving["ids"][] = $all_services[$i]->ids;
                $services_for_saving["nombre"][] = $_POST['s-'.($all_services[$i]->ids)];
                $services_for_saving["prix"][] = ($_POST['s-'.($all_services[$i]->ids)])*$all_services[$i]->prix_service;
            }
        }
        $requete = "INSERT INTO reservations (date_debut, date_fin, prix, exigences, annule, idu, idch) VALUES (?,?,?,?,?,?,?)";
        $unModel= new generalModele($requete, array($date_debut, $date_fin, $prix_r, $exigences,0,$idu,$idch));
        $idr = $unModel->executerAndGetId();

        for($j=0; $j < sizeof($services_for_saving["ids"]); $j++){
            $requete = "INSERT INTO reserv_service(prix_service, count_service, `exig-serv`, idr, ids) VALUES (?,?,?,?,?)";
            $unModel= new generalModele($requete, array( $services_for_saving["prix"][$j], $services_for_saving["nombre"][$j], '',$idr,$services_for_saving["ids"][$j]));
            $unModel->executer();
        }
       /*   echo "<pre>";
        print_r($services_for_saving);
        echo "</pre>";  */
        $tabRes['error']="";
    }catch (Exception $e){
        $tabRes['error']=$e;
    }finally{
        unset($unModele);
    }
}

function listerReservation(){
    global $tabRes;
    $idu = $_SESSION['userid'];
    $arrayOfResult = array();
    try {
        $requete = "SELECT `idr`, `date_debut`, `date_fin`, `type_animal`, `type_chambre`, `prix`, `annule` FROM `reservations`, `chambres`, `animaux`, `type_chambres` WHERE idu=? AND type_chambres.idtch=chambres.idtch AND animaux.idan=chambres.idan AND chambres.idch=reservations.idch GROUP BY idr ORDER BY `date_fin`";
        $unModele = new generalModele($requete, array($idu));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $tabRes["reservations"] = $arrayOfResult;
        $tabRes['action'] = "lister";
        $tabRes['msg'] = "ok";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function annulerReservation(){
   global $tabRes;
   $idr = $_POST['idr'];
   try {
       $requete = "UPDATE `reservations` SET `annule`='1' WHERE `idr`= ? ";
       $unModele = new generalModele($requete, array($idr));
       $stmt = $unModele->executer();
       $tabRes['action'] = "annuler";
       $tabRes['msg'] = "ok";
   } catch (Exception $e) {
       $tabRes['msg'] = "Erreur: " . $e;
   } finally{
       unset($unModele);
   }
}

function listerOpinion(){
    global $tabRes;
    $idu = $_SESSION['userid'];
    $arrayOfResult = array();
    try {
        $requete = "SELECT `idr`, `date_debut`, `date_fin`, `type_animal`, `type_chambre` FROM `reservations`, `chambres`, `animaux`, `type_chambres` WHERE idu=? AND type_chambres.idtch=chambres.idtch AND animaux.idan=chambres.idan AND chambres.idch=reservations.idch GROUP BY idr ORDER BY date_fin DESC";
        $unModele = new generalModele($requete, array($idu));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $arrayOfResult[] = $ligne;
        }
        $tabRes["reservations"] = $arrayOfResult;
        $tabRes['action'] = "listereservidu";
        $tabRes['msg'] = "ok";
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
    }
}

function  ecrireopinions(){
    global $tabRes;
    $idm = $_SESSION['userid'];
    $tabRes['action']="opinion";
    $descrtemoign = $_POST['descr_temoign'];
    $rateit = $_POST['rateit'];
    $idr = $_POST['idr'];
   // $choixreserv = '2';
    //$descrtemoign = 'JJGFJSKGHK';
    //$rateit = '5';
    //$ida="56";

    $dossier = "../images/opinions";
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

    try{
        $requete = "INSERT INTO albums VALUES(0,?)";
        $unModele = new generalModele($requete, array(
            "Opinion_idu".$idm."_idr".$idr
        ));
        $ida = $unModele->executerAndGetId();
        $requete1 = "INSERT INTO `temoignage`(`rating`, `descr_temoign`, `date_temoign`, `ida`, `afficher`,`idr`) VALUES (?,?,?,?,?,?)";
        $unModel1= new generalModele($requete1, array($rateit,$descrtemoign,date('Y-m-d'),$ida,0,$idr));
        $stmt1=$unModel1->executer();


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


        $tabRes['error']="";
    }catch (Exception $e){
        $tabRes['error']=$e;
    }finally{
        unset($unModele1);
    }
}

function afficherch(){
    global $tabRes;
    $resultCh = array();
    $resulte = array();
    $resultService = array();
    $date_debut = $_POST['date_debut'];
    $date_fin = $_POST['date_fin'];
    $idan = $_POST['idan'];
   try {
        $requete = "SELECT `idch`,`type_chambre`, `prix_jour`, `prix_semaine`,`prix_mois` FROM `chambres`,`type_chambres` WHERE chambres.idtch=type_chambres.idtch AND chambres.idan=?";
        $unModele = new generalModele($requete, array($idan));
        $stmt = $unModele->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $resultCh[] = $ligne;
        }
        for($i=0; $i<sizeof($resultCh); $i++){
            $requete1 = "CALL si_libre(?,?,?,@result)";
           // echo $resultCh[$i]->idch;
                $unModele1 = new generalModele($requete1, array($date_debut,$date_fin,$resultCh[$i]->idch));
                $stmt = $unModele1->executer();
                $ligne = $stmt->fetch(PDO::FETCH_OBJ);
                $resulte[] = $ligne;

        }

        $requete2 = "Select * from services";
        $unModele2 = new generalModele($requete2, array());
        $stmt = $unModele2->executer();
        while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
            $resultService[] = $ligne;
        }

        $tabRes['resultCh'] = $resultCh;
        $tabRes['resultService'] = $resultService;
        $tabRes['action'] = "reste";
        $tabRes['msg'] = "ok";
        $tabRes['disponible'] = $resulte;
    } catch (Exception $e) {
        $tabRes['msg'] = "Erreur: " . $e;
    } finally{
        unset($unModele);
        unset($unModele1);
    }
}

$action = $_POST['action']; //$_GET['action'];
switch($action){
    case "registration" :
        enregistrerReservation();
        break;
    case "lister":
        listerReservation();
        break;
    case "annuler":
        annulerReservation();
        break;
    case "listereservidu":
        listerOpinion();
        break;
    case "opinion":
        ecrireopinions();
        break;
    case "reste":
        afficherch();
        break;
}
echo json_encode($tabRes);
?>
