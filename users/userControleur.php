<?php
session_start();
$tabRes=array();
require_once("../includes/modele.inc.php");
function getUserFromSession(){
    global $tabRes;
    $tabRes['action']="userfromsession";
    if (isset($_SESSION['username'])){
        $tabRes['userid'] = $_SESSION['userid'];
        $tabRes['username'] = $_SESSION['username'];
    }else {
        $tabRes['username']="";
    }
}

function enregistrerUser(){
    global $tabRes;
    $tabRes['action']="registration";
    $username = $_POST['username'];
    $email = $_POST['email'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $phone = $_POST['phone'];
    $code_postal = $_POST['code_postal'];
    $password1 = $_POST['password1'];
    $password1 = md5($password1);
    try{
        $requete1 = "SELECT * FROM users, membres WHERE users.username=? OR membres.email=? LIMIT 1";
        $unModel1= new generalModele($requete1, array($username,$email));
        $stmt1=$unModel1->executer();
        if(!$ligne1=$stmt1->fetch(PDO::FETCH_OBJ)){
            $requete2 = 'INSERT INTO users (username, password) VALUES (?,?)';
            $unModel2 = new generalModele($requete2, array($username, $password1));
            $idu = $unModel2->executerAndGetId();
            $requete3 = 'INSERT INTO membres (nom, prenom, email, phone, code_postal, idu) VALUES (?, ?, ?, ?, ?, ?)';
            $unModel3=new generalModele($requete3, array($nom, $prenom, $email, $phone, $code_postal, $idu));
            $idm = $unModel3->executerAndGetId();
            $_SESSION['username'] = $username;
            $_SESSION['userid'] = $idm;
            $tabRes['error']="";

        }else{
            $tabRes['error']="Un utilisateur avec un ce nom d'utilisateur ou e-mail existe";
        }
    }catch (Exception $e){
        $tabRes['e']=$e;
    }finally{
        unset($unModele1);
        unset($unModele2);
        unset($unModele3);
    }
}

function login(){
    global $tabRes;
    $tabRes['action']="login";
    $username = $_POST['usernameL'];
    $password = $_POST['passwordL'];
    $password = md5($password);
    try{
        $query = "SELECT username, password, idu, role FROM users WHERE username=? AND password=?";
        $unModele = new generalModele($query,array($username,$password));
        $stmt = $unModele->executer();
        $ligne = $stmt->fetch(PDO::FETCH_OBJ);
        if ($stmt->rowCount() == 1) {
            $_SESSION['userid'] = $ligne->idu;
            $_SESSION['username'] = $ligne->username;
            $_SESSION['role'] = $ligne->role;
            $tabRes['userid'] = $_SESSION['userid'];
            $tabRes['username'] = $_SESSION['username'];
            $tabRes['role'] = $_SESSION['role'];
            $tabRes['error']= "";
        }else {
            $tabRes['error']= "Mauvaise Pseudo/Mot de passe";
        }
    }catch (Exception $e){
        $tabRes['error']=$e;
    }finally{
        unset($unModele);
    }
}

function userLogout(){
    global $tabRes;
    unset($_SESSION['username']);
    unset($_SESSION['userid']);
    unset($_SESSION['role']);
    $_SESSION = array();
    session_destroy();
    $tabRes['action']="logout";
}

function getfiche(){
    global $tabRes;
    $idm = $_SESSION['userid'];
    $tabRes['action']="fiche";
    $query = "SELECT * FROM `membres` WHERE idm = ?";
    try{
        $unModele = new generalModele($query,array($idm));
        $stmt=$unModele->executer();
        $tabRes['fiche']=array();
        if($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
            $tabRes['fiche']=$ligne;
            $tabRes['OK']=true;
        }
        else{
            $tabRes['OK']=false;
        }
    }
    catch (Exception $e){
    }finally{
        unset($unModele);
    }
}

function updateUser(){
    global $tabRes;
    $id = $_SESSION['userid'];
    $nom = $_POST['nomU'];
    $prenom = $_POST['prenomU'];
    $courriel = $_POST['emailU'];
    $telephone = $_POST['phoneU'];
    $codepostal = $_POST['code_postalU'];
    try{$query = "UPDATE `membres` SET nom=?, prenom=?, email=?, phone=?, code_postal=? WHERE idm = ?";
    $unModele = new generalModele($query, array($nom,$prenom,$courriel,$telephone,$codepostal,$id));
    $stmt=$unModele->executer();
    $tabRes['action']="modifier";
    $tabRes['msg']="Votre profil est bien modifier";
    }
    catch (Exception $e){
        $tabRes['msg']=$e;
    }finally{
        unset($unModele);
    }
}

$action = $_POST['action']; //$_GET['action'];
switch($action){
    case "registration" :
        enregistrerUser();
        break;
    case "connection" :
        login();
        break;
    case "logout" :
        userLogout();
        break;
    case "getuser" :
        getUserFromSession();
        break;
    case "fiche" :
        getfiche();
        break;
    case "modifier" :
        updateUser();
        break;
}
echo json_encode($tabRes);
?>
