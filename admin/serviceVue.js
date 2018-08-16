function enregistrerServiceVue(reponse) {
    if (reponse.err == "") {
	$('#selectedFilesNewService').children().remove();
	$('#imagesNewService').val("");
	$('#nom_service_ajouter').val("");
	$('#descr_service_ajouter').val("");
	$('#prix_service_ajouter').val("");
	$('#service_ajouter .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#service_ajouter .footer').html("");
	}, 5000);
    } else {
	$('#service_ajouter .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.err + "</p>");
	setTimeout(function() {
	    $('#service_ajouter .footer').html("");
	}, 5000);
    }
}

function listerServiceVue(reponse) {
    var allServices = reponse.services;
    var res = "";
    res += "<table class=\"table nav-text mt-4\">";
    res += "<thead>";
    res += "<tr>";
    res += "<th>Nom Service</th>";
    res += "<th>Description service</th>";
    res += "<th>Prix service</th>"
    res += "<th>Images</th>";
    res += "<th></th>";
    res += "<th></th>";
    res += "</tr>";
    res += "</thead>";
    res += "<tbody>";
    var quantityOfServices = allServices.length;
    for (var i = 0; i < quantityOfServices; i++) {
	if ((i == 0) || (i > 0 && allServices[i].ids != allServices[i - 1].ids)) {
	    res += "<tr>";
	    res += "<td>" + allServices[i].nom_service + "</td>";
	    res += "<td>" + allServices[i].descr_service + "</td>";
	    res += "<td>" + allServices[i].prix_service + "</td>";
	    res += "<td>";
	}
	res += "<img src='../" + allServices[i].dossier + "/"
		+ allServices[i].fichier
		+ "' class=\"rounded float-left\" alt='"
		+ allServices[i].descr_img + "'>";
	if ((i + 1 == quantityOfServices) || (i < quantityOfServices - 1)
		&& (allServices[i].ids != allServices[i + 1].ids)) {
	    res += "</td>";
	    res += "<td><button type=\"button\" onclick=\"ficheService("
		    + allServices[i].ids
		    + "); showWindow('service_modifier');\" class=\"btn btn-envoyer bg-block-body mb-3\">Modifier</button></td>";
	    res += "<td><button type=\"button\" class=\"btn btn-envoyer bg-block-body mb-3\" onclick=\"enleverService("
		    + allServices[i].ida + ")\">Enlever</button></td>";
	}
    }
    res += "</tbody>";
    res += "</table>";
    $('#listerServicesBody').html(res);
}

function enleverServiceVue(reponse) {
    if (reponse.msg = "ok"){
	showServiceLister();
	$('#service_lister .footer').html("<p class=\"pl-3 text-primary\">Service est bien enlevé</p>");
	setTimeout(function(){ $('#service_lister .footer').html(""); }, 5000);
    }else {
	$('#service_lister .footer').html("<p class=\"pl-3 text-primary\">"+reponse.msg+"</p>");
	setTimeout(function(){ $('#service_lister .footer').html(""); }, 5000);
    }

}

function afficherServiceVue(reponse) {
    var service = reponse.service;
    var res = "";
    for (var i = 0; i < service.length; i++) {
	res += "<div class=\"col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3\">";
	res += "<div class=\"card\">";
	res += "<img class=\"card-img-top img-thumbnail\" src='../"
		+ service[i].dossier + "/" + service[i].fichier
		+ "' alt=\"Photo of service\" style='height: 150px;'>";
	res += "<div class=\"card-body\">";
	res += "<p class=\"card-text\">" + service[i].descr_img + "</p>";
	res += "<button type=\"button\" onclick=\"enleverImageService("
		+ service[i].idi + ", " + service[i].ids
		+ ")\" class=\"btn btn-primary\">Enlever</button>";
	res += "</div>";
	res += "</div>";
	res += "</div>";
    }
    $('#nameModifiedService').val(service[0].nom_service);
    $('#descrModifiedService').val(service[0].descr_service);
    $('#prixModifiedService').val(service[0].prix_service);
    $('#listOfImagesInService').html(res);
    var hiddenInputA = $('<input type="hidden" name="ida" value="'
	    + reponse.ida + '"></input>');
    var hiddenInputS = $('<input type="hidden" name="ids" value="'
	    + reponse.ids + '"></input>');
    $('#formModifierService').append(hiddenInputA);
    $('#formModifierService').append(hiddenInputS);
}

function enleverImageServiceVue(reponse) {
    ficheService(reponse.ids);
    if (reponse.msg != "") {
	$('#service_modifier .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#service_modifier .footer').html("");
	}, 5000);
    }else {
	$('#service_modifier .footer').html(
		"<p class=\"pl-3 text-primary\">Image etait bien supprimer</p>");
	setTimeout(function() {
	    $('#service_modifier .footer').html("");
	}, 5000);
    }
}

function updateServiceVue(reponse) {
    ficheService(reponse.ids);
    $('#selectedFilesUpdateService').children().remove();
    $('#imagesUpdateService').val("");
    $('#service_modifier .footer').html(
	    "<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
    setTimeout(function() {
	$('#service_modifier .footer').html("");
    }, 5000);

}

var serviceVue = function(reponse) {
    var action = reponse.action;
    switch (action) {
    case "enregistrer":
	enregistrerServiceVue(reponse);
	break;
    case "lister" :
	listerServiceVue(reponse)
	break;
    case "enlever" :
	enleverServiceVue(reponse);
	break;
    case "afficheService":
	afficherServiceVue(reponse);
	break;
    case "enleverimage":
	enleverImageServiceVue(reponse);
	break;
    case "updateservice":
	updateServiceVue(reponse);
	break;
    }
};
