var object_properties = {
    root: "/animarium/"
}

function validateFormNewUser() {
	var reponse = "";
	var testUsername = /^[0-9a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ\-\_\.]{3,50}$/;
	if (!testUsername.test($('#username').val().trim())) {
		reponse += "<p class=\"text-danger\">Pseudo doit contenir au moins 3 caractères</p>";
	}
	var testPass = /^[\x00-\x7F]{6,12}$/;
	if (!testPass.test($('#password1').val().trim())
			|| !testPass.test($('#password2').val().trim())) {
		reponse += "<p class=\"text-danger\">Mot de passe doit contenir au moins 6 caractères</p>";
	} else if ($('#password1').val() != $('#password2').val()) {
		reponse += "<p class=\"text-danger\">Les mots de passe que vous avez entrés ne correspondent pas</p>";
	}
	var testNom = /^[a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ\-]{1,50}$/;
	if (!testNom.test($('#nom').val().trim())) {
		reponse += "<p class=\"text-danger\">Nom doit contenir au moins 1 caractère</p>";
	}
	var testPrenom = /^[a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ\-]{1,50}$/;
	if (!testPrenom.test($('#prenom').val().trim())) {
		reponse += "<p class=\"text-danger\">Prenom doit contenir au moins 1 caractère</p>";
	}
	var testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!testEmail.test($('#email').val().trim())) {
		reponse += "<p class=\"text-danger\">Adresse e-mail incorrecte</p>";
	}
	var testPhone = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
	if (!testPhone.test($('#phone').val().trim())) {
		reponse += "<p class=\"text-danger\">Numero entré incorrecte</p>";
	}
	var testCodepostal = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/;
	if (!testCodepostal.test($('#code_postal').val().trim())) {
		reponse += "<p class=\"text-danger\">Code Postal inexistant</p>";
	}
	if (reponse == "") {
		$('#divRegistration .panel-footer').html("");
		return true;
	} else {
		$('#divRegistration .panel-footer').html(reponse);
		return false;
	}
}

function rendreVisible(elem) {
	document.getElementById(elem).style.display = 'block';
}

function rendreInvisible(elem) {
	document.getElementById(elem).style.display = 'none';
}

function validateFormLogin() {
	var reponse = "";
	var testUsernameL = /^[0-9a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ\-\_\.]{3,50}$/;
	if (!testUsernameL.test($('#usernameL').val().trim())) {
		reponse += "<p class=\"text-danger\">Pseudo ne peut pas être vide</p>";
	}
	var testPassL = /^[\x00-\x7F]{6,12}$/;
	if (!testPassL.test($('#passwordL').val().trim())) {
		reponse += "<p class=\"text-danger\">Votre mot de passe ne correspond pas</p>";
	}
	if (reponse == "") {
		$('#divLogin .panel-footer').html("");
		return true;
	} else {
		$('#divLogin .panel-footer').html(reponse);
		return false;
	}
}

function validateFormModifierClient() {
	var reponse = "";
	var testNomU = /^[a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ\-]{1,50}$/;
	if (!testNomU.test($('#nomU').val().trim().length) == 0) {
		reponse += "<p class=\"text-danger\">Nom ne peut pas être vide</p>";
	}
	var testPrenomU = /^[a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ\-]{1,50}$/;
	if (!testPrenomU.test($('#prenomU').val().trim().length) == 0) {
		reponse += "<p class=\"text-danger\">Prénom ne peut pas être vide</p>";
	}
	var testEmailU = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!testEmailU.test($('#emailU').val().trim())) {
		reponse += "<p class=\"text-danger\">Adresse e-mail incorrecte</p>";
	}
	var testPhoneU = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;
	if (!testPhoneU.test(($('#phoneU').val().trim()))) {
		reponse += "<p class=\"text-danger\">Numero de téléphone entré incorrecte</p>";
	}
	var testCodepostalU = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/;
	if (!testCodepostalU.test(($('#code_postalU').val().trim()))) {
		reponse += "<p class=\"text-danger\">Code Postal inexistant</p>";
	}
	if (reponse == "") {
		$('#divModifierProfil .panel-footer').html("");
		return true;
	} else {
		$('#divModifierProfil .panel-footer').html(reponse);
		return false;
	}

}
function validerFormReservation(){
    if($('#date_debut').val() != "" && $('#date_fin').val() != ""
	&& $('#type_animal').val() != "" && $('#type_chambre').val() != ""){
	return true;
    }else {
	return false;
    }
}

function siannulationpossible(reserv_date) {
	var newDate = new Date(reserv_date);
	alert(newDate.getTime() / (1000 * 60 * 60 * 24));
	alert(newDate);
	alert(newDate.getTime());
	alert((newDate.getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24));

}
function attachonclick(id) {
	$('#ModalAnnulerReservation').click(function() {
		annulerReservation(id);
	});

}

function fullReservation() {
    $('#calculation_de_prix').html('');
	if ($('#date_debut').val() != "" && $('#date_fin').val() != ""
			&& $('#type_animal').val() != "") {
		$('#reservparam').show();
		var a = $('#date_debut').val();
		var b = $('#date_fin').val();
		var c = $('#type_animal').val();
		ResteChambre(a, b, c);
		prixChambre();
	}

}

function checkDate() {
	var input_date1 = document.getElementById('date_debut').value.split('-');
	var input_date2 = document.getElementById('date_fin').value.split('-');

	var date1 = new Date(input_date1[0], input_date1[1], input_date1[2]);
	var date2 = new Date(input_date2[0], input_date2[1], input_date2[2]);

	var timeDiff = Math.abs(date1.getTime() - date2.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return diffDays;

}

function joursAvant(date_res){
    var input_date = date_res.split('-');
    var date_gen = new Date(input_date[0], input_date[1]-1, input_date[2]).getTime();
    var date_cur = new Date ().getTime ();
    return (Math.floor((date_cur - date_gen) / 86400000));
}

function prixChambre(){
    if($('#date_debut').val() != "" && $('#date_fin').val() != ""
	&& $('#type_animal').val() != "" && $('#type_chambre').val() != ""){
	var prix_mois=	$('#type_chambre option:selected').data('mois');
	var prix_semaine=	$('#type_chambre option:selected').data('semaine');
	var prix_jour=	$('#type_chambre option:selected').data('jour');
	var all_services=document.getElementsByClassName('list_of_services');
	var prix_all_services=0;
	for (var i=0; i<all_services.length; i++){
	    prix_all_services += all_services[i].dataset.prix*all_services[i].value;
	}
	var prix_reservation=totalPrix(prix_mois,prix_semaine,prix_jour);
	if (isNumeric(prix_reservation) && isNumeric(prix_all_services)){
        	var calculation="";
        	calculation += "<h4 class=\"text-center\">Prix complet</h4>";
        	calculation += "<p>Prix pour la reservation: "+parseFloat(prix_reservation)+"$</p>";
        	calculation += "<p>Prix pour les services: "+prix_all_services+"$</p>";
        	calculation += "<p>Prix total: "+(parseFloat(prix_all_services)+parseFloat(prix_reservation))+"$</p>";
        	$('#calculation_de_prix').html(calculation);
        	$('#prix_de_reservation').val(prix_reservation);
        	$('#prix_de_services').val(prix_all_services);
	}
    }

}

function totalPrix(pm,ps,pj) {
	var q = checkDate()+1;
	if (q >= 1){
		var qm = Math.trunc(q / 30);
		var qs = Math.trunc((q - qm * 30) / 7);
		var qj = q - qm * 30 - qs * 7;
		var prix = qm*pm + qs*ps + qj*pj;
		return prix;
		}
	return 0;

}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
