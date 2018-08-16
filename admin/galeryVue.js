function enregistrerGaleryVue(reponse) {
    if (reponse.err == "") {
	$('#selectedFilesNewGalery').children().remove();
	$('#imagesNewGalerie').val("");
	$('#nom_galery_ajouter').val("");
	$('#galerie_ajouter .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#galerie_ajouter .footer').html("");
	}, 5000);
    } else {
	$('#galerie_ajouter .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.err + "</p>");
	setTimeout(function() {
	    $('#galerie_ajouter .footer').html("");
	}, 5000);
    }
}

function listerGaleryVue(reponse) {
    var allGaleries = reponse.galeries;
    var res = "";
    res += "<table class=\"table nav-text mt-4\">";
    res += "<thead>";
    res += "<tr>";
    res += "<th>Nom Galery</th>";
    res += "<th>Images</th>";
    res += "<th></th>";
    res += "<th></th>";
    res += "</tr>";
    res += "</thead>";
    res += "<tbody>";
    var quantityOfGaleries = allGaleries.length;
    for (var i = 0; i < quantityOfGaleries; i++) {
	if ((i == 0) || (i > 0 && allGaleries[i].idg != allGaleries[i - 1].idg)) {
	    res += "<tr>";
	    res += "<td>" + allGaleries[i].nom_galeries + "</td>";
	    res += "<td>";
	}
	res += "<img src='../" + allGaleries[i].dossier + "/"
		+ allGaleries[i].fichier
		+ "' class=\"rounded float-left\" alt='"
		+ allGaleries[i].descr_img + "'>";
	if ((i + 1 == quantityOfGaleries) || (i < quantityOfGaleries - 1)
		&& (allGaleries[i].idg != allGaleries[i + 1].idg)) {
	    res += "</td>";
	    res += "<td><button type=\"button\" onclick=\"ficheGalerie("
		    + allGaleries[i].idg
		    + "); showWindow('galerie_modifier');\" class=\"btn btn-envoyer bg-block-body mb-3\">Modifier</button></td>";
	    res += "<td><button type=\"button\" class=\"btn btn-envoyer bg-block-body mb-3\" onclick=\"enleverGaleries("
		    + allGaleries[i].ida + ")\">Enlever</button></td>";
	}
    }
    res += "</tbody>";
    res += "</table>";
    $('#listerGaleryBody').html(res);
}

function enleverGaleryVue(reponse) {
    if (reponse.msg = "ok") {
	showGaleryLister();
    } else {
	$('#galery_lister .footer').html("<p class=\"pl-3 text-primary\">"+reponse.msg+"</p>");
	setTimeout(function(){ $('#galery_lister .footer').html(""); }, 5000);
    }
}

function afficherGaleryVue(reponse) {
    var galerie = reponse.galerie;
    var res = "";
    for (var i = 0; i < galerie.length; i++) {
	res += "<div class=\"col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3\">";
	res += "<div class=\"card\">";
	res += "<img class=\"card-img-top img-thumbnail\" src='../"
		+ galerie[i].dossier + "/" + galerie[i].fichier
		+ "' alt=\"Card image cap\" style='height: 150px;'>";
	res += "<div class=\"card-body\">";
	res += "<p class=\"card-text\">" + galerie[i].descr_img + "</p>";
	res += "<button type=\"button\" onclick=\"enleverImageGalery("
		+ galerie[i].idi + ", " + galerie[i].idg
		+ ")\" class=\"btn btn-primary\">Enlever</button>";
	res += "</div>";
	res += "</div>";
	res += "</div>";
    }
    $('#nameModifiedGalery').val(galerie[0].nom_galeries);
    $('#listOfImagesInGalery').html(res);
    var hiddenInputA = $('<input type="hidden" name="ida" value="'
	    + reponse.ida + '"></input>');
    var hiddenInputG = $('<input type="hidden" name="idg" value="'
	    + reponse.idg + '"></input>');
    $('#formModifierGalerie').append(hiddenInputA);
    $('#formModifierGalerie').append(hiddenInputG);
}

function enleverImageGaleryVue(reponse) {
    ficheGalerie(reponse.idg);
    if (reponse.msg != "") {
	$('#galerie_modifier .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#galerie_modifier .footer').html("");
	}, 5000);
    }
}

function updateGalerieVue(reponse) {
    ficheGalerie(reponse.idg);
    $('#selectedFilesUpdateGalery').children().remove();
    $('#imagesUpdateGalerie').val("");
    $('#galerie_modifier .footer').html(
	    "<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
    setTimeout(function() {
	$('#galerie_modifier .footer').html("");
    }, 5000);

}

var galeryVue = function(reponse) {
    var action = reponse.action;
    switch (action) {
    case "enregistrer":
	enregistrerGaleryVue(reponse);
	break;
    case "lister":
	listerGaleryVue(reponse);
	break;
    case "enlever":
	enleverGaleryVue(reponse);
	break;
    case "afficheGalery":
	afficherGaleryVue(reponse);
	break;
    case "enleverimage":
	enleverImageGaleryVue(reponse);
	break;
    case "updategalerie":
	updateGalerieVue(reponse);
	break;
    }
};
