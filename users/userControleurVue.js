function affichePanel(reponse) {
	var res = "";
	if (reponse.username != "") {
		$('#divSignupLogin').hide();
		$('#divClient').show();
		$('#zero_login').html("<span class=\"nav-link text-uppercase\">Salut, "+ reponse.username + "!</span>");
		$('#first_login').html("<a href=\"#\" class=\"nav-link text-uppercase\" onclick=\"userLogout();\">Déconnecter</a>");
	} else {
		$('#zero_login').html("");
		$('#first_login').html("<a class=\"nav-link text-uppercase\" href='"+object_properties.root+"Le Petit Monde/html/signin.html'>Connexion</a>");
	}
}
function newUser(reponse) {
	if (reponse.error == "") {
		$('#username').val("");
		$('#password1').val("");
		$('#password2').val("");
		$('#nom').val("");
		$('#prenom').val("");
		$('#email').val("");
		$('#phone').val("");
		$('#code_postal').val("");
		currentUser();
		// showMainPage();
	} else {
		$('#divRegistration .panel-footer').html(reponse.error);
	}
}
function checkUserLogin(reponse) {
	if (reponse.error == "") {
	    	$('#usernameL').val('');
		$('#passwordL').val('');
		if (reponse.role == "ADMIN") {
			// showAdminLister();
			window.location.href = "../admin/admin.php";
		} else {
			// showMainPage();
			// windows.location.href="pageclient.html";
			$('#divSignupLogin').hide();
			$('#divClient').show();
			document.getElementById('divClient').style.display = 'block';

			currentUser();
		}
	} else {
		$('#divLogin .panel-footer').html(
				"<p class=\"text-danger\">" + reponse.error + "</p>");
	}
}
function faireLogout() {
	// showMainPage();
    	if (document.getElementById('divClient')){
    	    $('#divClient').hide();
    	}
    	if (document.getElementById('divSignupLogin')){
    	    $('#divSignupLogin').show();
    	}
	//document.getElementById('divSignupLogin').style.display = 'block';

	currentUser();
}
function afficherFiche(reponse) {
	var uneFiche;
	if (reponse.OK) {
		uneFiche = reponse.fiche;
		$('#nomU').val(uneFiche.nom);
		$('#prenomU').val(uneFiche.prenom);
		$('#emailU').val(uneFiche.email);
		$('#phoneU').val(uneFiche.phone);
		$('#code_postalU').val(uneFiche.code_postal);
	} else {
	}
}

var userVue = function(reponse) {
	var action = reponse.action;
	switch (action) {
	case "userfromsession":
		affichePanel(reponse);
		break;
	case "login":
		checkUserLogin(reponse);
		break;
	case "logout":
		faireLogout();
		break;
	case "registration":
		newUser(reponse);
		break;
	case "fiche":
		afficherFiche(reponse);
		break;
	case "modifier":
		$('#panel-footer').html(reponse.msg);
		setTimeout(function() {
			$('#panel-footer').html("");
		}, 5000);
		break;
	}
};
