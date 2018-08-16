<?php
require_once("../BD/connexion.inc.php");
class generalModele{
	private $requete;
	private $params;
	private $connexion;

function __construct($requete=null,$params=null){
		$this->requete=$requete;
		$this->params=$params;
}

function obtenirConnexion(){
	$maConnexion = new Connexion("localhost", "root", "", "bdhotel");
	$maConnexion->connecter();
	return $maConnexion->getConnexion();
}

function executer(){
		$this->connexion = $this->obtenirConnexion();
		$stmt = $this->connexion->prepare($this->requete);
		$stmt->execute($this->params);
		$this->deconnecter();
		return $stmt;
	}
function deconnecter(){
		unset($this->connexion);
}
function executerAndGetId(){
	$this->connexion = $this->obtenirConnexion();
	$stmt = $this->connexion->prepare($this->requete);
	$stmt->execute($this->params);
	$id=$this->connexion->lastInsertId();
	$this->deconnecter();
	return $id;
}

function verserFichiers($dossier, $inputNom, $allFiles){
	$dossier="../$dossier/";
	if (!file_exists($dossier)) {
	    mkdir($dossier, 0755, true);
	}
	$mass_length=sizeof($allFiles["nom"]);
	for ($i=0; $i<$mass_length; $i++){
	    $nomPochette=sha1($allFiles["nom"][$i].time());
	    $tmp = $_FILES[$inputNom]['tmp_name'][$i];
	    $fichier= $_FILES[$inputNom]['name'][$i];
	    $extension=strrchr($fichier,'.');
	    @move_uploaded_file($tmp,$dossier.$nomPochette.$extension);
	    // Enlever le fichier temporaire charg�
	    @unlink($tmp); //effacer le fichier temporaire
	    $allFiles["new_nom"][$i]=$nomPochette.$extension;
	}
	return $allFiles;
}

function enleverFichier($dossier,$pochette){
	if($pochette!="avatar.jpg"){
		$rmPoc="../$dossier/".$pochette;
		$tabFichiers = glob("../$dossier/*");
		//print_r($tabFichiers);
		// parcourir les fichier
		foreach($tabFichiers as $fichier){
		  if(is_file($fichier) && $fichier==trim($rmPoc)) {
			// enlever le fichier
			unlink($fichier);
			break;
		  }
		}
	}
}
}//fin de la classe
?>
