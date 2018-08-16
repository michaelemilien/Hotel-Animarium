function attachonclick(id){
	$('#confirmationModal').click(function(){
		annulerReservation(id);
	});

}

var allElemId = [ "galerie_ajouter", "galerie_modifier", "galerie_lister", "service_lister",
        "service_modifier", "service_ajouter", "chambre_ajouter", "chambre_lister", "chambre_modifier", "service_modifier",
        "reservation_by_parameters", "reservation_modifier", "temoignage_lister", "temoignage_modifier"];

function showWindow(windowNom) {
    var elem;
    for (var i = 0; i < allElemId.length; i++) {
	elem=document.getElementById(allElemId[i]);
	if (elem.style.display == "block" && allElemId[i] != windowNom){
	    elem.style.display = "none";
	}else if (windowNom == allElemId[i]){
	    elem.style.display = "block";
	}
    }
}
function validateFormGalerie(){
    var reponse="";
    var testNomGalery=/^[ 0-9a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ.,\/#!$%\^&\*;:{}=\-_`~()]{1,100}$/;
    if (!testNomGalery.test($('#nom_galery_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Nom de gallery n'est pas correct</p>";
    }
    if (document.getElementById('imagesNewGalerie').files.length == 0){
	reponse += "<p class=\"text-danger pl-3\">Il faut choisir une image au minimum</p>";
    }
    if (reponse == "") {
	$('#galerie_ajouter .footer').html("");
	return true;
    } else {
	$('#galerie_ajouter .footer').html(reponse);
	return false;
    }
}
function validateFormService(){
    var reponse="";
    var testNomService=/^[ 0-9a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ.,\/#!$%\^&\*;:{}=\-_`~()]{1,100}$/;
    if (!testNomService.test($('#nom_service_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Nom de service n'est pas correct</p>";
    }
    var testServiceDescr=/^[ 0-9a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ.,\/#!$%\^&\*;:{}=\-_`~()]{1,65535}$/;
    if (!testServiceDescr.test($('#descr_service_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Description de service n'est pas correct</p>";
    }

    var testServicePrix=/^[1-9]{1}[0-9]{0,7}\.{0,1}[0-9]{0,2}$/;
    if (!testServicePrix.test($('#prix_service_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Prix de service n'est pas correct</p>";
    }
    if (document.getElementById('imagesNewService').files.length == 0){
	reponse += "<p class=\"text-danger pl-3\">Il faut choisir une image au minimum</p>";
    }
    if (reponse == "") {
	$('#service_ajouter .footer').html("");
	return true;
    } else {
	$('#service_ajouter .footer').html(reponse);
	return false;
    }
}

function validateFormChambre(){
    var reponse="";
    var testChambreDescr=/^[ 0-9a-zA-zàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ.,\/#!$%\^&\*;:{}=\-_`~()]{1,65535}$/;
    if (!testChambreDescr.test($('#desc_chambre_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Description de chambre n'est pas correct</p>";
    }
    var testChambrePlaces=/^[1-9]{1}[0-9]{0,4}$/;
    if (!testChambrePlaces.test($('#places_chambre_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Quantite de places n'est pas correct</p>";
    }
    var testChambreJourPrix=/^[1-9]{1}[0-9]{0,7}\.{0,1}[0-9]{0,2}$/;
    if (!testChambreJourPrix.test($('#prix_jour_chambre_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Prix par jour n'est pas correct</p>";
    }
    var testChambreSemainPrix=/^[1-9]{1}[0-9]{0,7}\.{0,1}[0-9]{0,2}$/;
    if (!testChambreSemainPrix.test($('#prix_semain_chambre_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Prix par semain n'est pas correct</p>";
    }
    var testChambreMoisPrix=/^[1-9]{1}[0-9]{0,7}\.{0,1}[0-9]{0,2}$/;
    if (!testChambreMoisPrix.test($('#prix_mois_chambre_ajouter').val().trim())) {
	reponse += "<p class=\"text-danger pl-3\">Prix par mois n'est pas correct</p>";
    }

    if (document.getElementById('imagesNewChambre').files.length == 0){
	reponse += "<p class=\"text-danger pl-3\">Il faut choisir une image au minimum</p>";
    }
    if (reponse == "") {
	$('#chambre_ajouter .footer').html("");
	return true;
    } else {
	$('#chambre_ajouter .footer').html(reponse);
	return false;
    }
}
