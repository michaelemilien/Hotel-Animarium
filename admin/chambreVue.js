function ficheAjouterChambreVue(reponse) {
    var chambres = reponse.chambres;
    var animaux = reponse.animaux;
    var lenChambres = chambres.length;
    var lenAnimaux = animaux.length;
    for (var i = 0; i < lenChambres; i++) {
	$('#type_chambre_ajouter').append($('<option>', {
	    value : chambres[i].idtch,
	    text : chambres[i].type_chambre
	}));
    }
    for (var i = 0; i < lenAnimaux; i++) {
	$('#animal_chambre_ajouter').append($('<option>', {
	    value : animaux[i].idan,
	    text : animaux[i].type_animal
	}));
    }
}

function enregistrerChambreVue(reponse) {
    if (reponse.err == "") {
	$("#formAjouterChambre")[0].reset();
	$('#type_chambre_ajouter').empty();
	$('#animal_chambre_ajouter').empty();
	$('#selectedFilesNewChambre').children().remove();
	$('#chambre_ajouter .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#chambre_ajouter .footer').html("");
	}, 5000);

    } else {
	$('#chambre_ajouter .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.err + "</p>");
	setTimeout(function() {
	    $('#chambre_ajouter .footer').html("");
	}, 5000);
    }
}

function listerChambresVue(reponse){
    var allChambres = reponse.chambres;
    var res = "";
    res += "<table class=\"table nav-text mt-4\">";
    res += "<thead>";
    res += "<tr>";
    res += "<th>Nom Chambre</th>";
    res += "<th>Places</th>";
    res += "<th>Images</th>";
    res += "<th></th>";
    res += "<th></th>";
    res += "</tr>";
    res += "</thead>";
    res += "<tbody>";
    var quantityOfChambres = allChambres.length;
    for (var i = 0; i < quantityOfChambres; i++) {
	if ((i == 0) || (i > 0 && allChambres[i].idch != allChambres[i - 1].idch)) {
	    res += "<tr>";
	    res += "<td>" + allChambres[i].nom_album + "</td>";
	    res += "<td>" + allChambres[i].places + "</td>";
	    res += "<td>";
	}
	res += "<img src='../" + allChambres[i].dossier + "/"
		+ allChambres[i].fichier
		+ "' class=\"rounded float-left\" alt='"
		+ allChambres[i].descr_img + "'>";
	if ((i + 1 == quantityOfChambres) || (i < quantityOfChambres - 1)
		&& (allChambres[i].idch != allChambres[i + 1].idch)) {
	    res += "</td>";
	    res += "<td><button type=\"button\" onclick=\"showChambreModifier("
		    + allChambres[i].idch
		    + ");\" class=\"btn btn-envoyer bg-block-body mb-3\">Modifier</button></td>";
	    res += "<td><button type=\"button\" class=\"btn btn-envoyer bg-block-body mb-3\" onclick=\"enleverChambre("
		    + allChambres[i].ida + ")\">Enlever</button></td>";
	}
    }
    res += "</tbody>";
    res += "</table>";
    $('#listerChambresBody').html(res);
}

function enleverChambreVue(reponse){
    if (reponse.msg = "ok"){
	showChambreLister();
	$('#chambre_lister .footer').html("<p class=\"pl-3 text-primary\">Chambre est bien enlevé</p>");
	setTimeout(function(){ $('#chambre_lister .footer').html(""); }, 5000);
    }else {
	$('#chambre_lister .footer').html("<p class=\"pl-3 text-primary\">"+reponse.msg+"</p>");
	setTimeout(function(){ $('#chambre_lister .footer').html(""); }, 5000);
    }
}

function afficheChambreVue(reponse){
    var chambre = reponse.chambre;
    var res = "";
    for (var i = 0; i < chambre.length; i++) {
	res += "<div class=\"col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3\">";
	res += "<div class=\"card\">";
	res += "<img class=\"card-img-top img-thumbnail\" src='../"
		+ chambre[i].dossier + "/" + chambre[i].fichier
		+ "' alt=\"Photo of chambre\" style='height: 150px;'>";
	res += "<div class=\"card-body\">";
	res += "<p class=\"card-text\">" + chambre[i].descr_img + "</p>";
	res += "<button type=\"button\" onclick=\"enleverImageChambre("
		+ chambre[i].idi + ", " + chambre[i].idch
		+ ")\" class=\"btn btn-primary\">Enlever</button>";
	res += "</div>";
	res += "</div>";
	res += "</div>";
    }

    $('#type_chambre_ajouter').empty();
    $('#animal_chambre_ajouter').empty();
    var t_chambres = reponse.t_chambres;
    var t_animaux = reponse.t_animaux;
    var lenChambres = t_chambres.length;
    var lenAnimaux = t_animaux.length;

    for (var i = 0; i < lenChambres; i++) {
	$('#type_chambre_modifier').append($('<option>', {
	    value : t_chambres[i].idtch,
	    text : t_chambres[i].type_chambre
	}));
    }
    for (var i = 0; i < lenAnimaux; i++) {
	$('#animal_chambre_modifier').append($('<option>', {
	    value : t_animaux[i].idan,
	    text : t_animaux[i].type_animal
	}));
    }
    $('#type_chambre_modifier option[value=' + chambre[0].idtch + ']').attr('selected',
    'selected');
    $('#animal_chambre_modifier option[value=' + chambre[0].idan + ']').attr('selected',
    'selected');
    $('#desc_chambre_modifier').val(chambre[0].desc_chambre);
    $('#places_chambre_modifier').val(chambre[0].places);
    $('#prix_jour_chambre_modifier').val(chambre[0].prix_jour);
    $('#prix_semain_chambre_modifier').val(chambre[0].prix_semaine);
    $('#prix_mois_chambre_modifier').val(chambre[0].prix_mois);
    $('#listOfImagesInChambre').html(res);
    var hiddenInputA = $('<input type="hidden" name="ida" value="'
	    + chambre[0].ida + '"></input>');
    var hiddenInputC = $('<input type="hidden" name="idch" value="'
	    + chambre[0].idch + '"></input>');
    $('#formModifierChambre').append(hiddenInputA);
    $('#formModifierChambre').append(hiddenInputC);
}

function enleverImageChambreVue(reponse){
    ficheChambre(reponse.idch);
    if (reponse.msg != "") {
	$('#chambre_modifier .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#chambre_modifier .footer').html("");
	}, 5000);
    }else {
	$('#chambre_modifier .footer').html(
		"<p class=\"pl-3 text-primary\">Image etait bien supprimer</p>");
	setTimeout(function() {
	    $('#chambre_modifier .footer').html("");
	}, 5000);
    }
}

function updateChambreVue(reponse){
    ficheChambre(reponse.idch);
    $('#selectedFilesUpdateChambre').children().remove();
    $('#imagesUpdateChambre').val("");
    $('#chambre_modifier .footer').html(
	    "<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
    setTimeout(function() {
	$('#chambre_modifier .footer').html("");
    }, 5000);
}

var chambreVue = function(reponse) {
    var action = reponse.action;
    switch (action) {
    case "ficheajoutechambre":
	ficheAjouterChambreVue(reponse);
	break;
    case "enregistrer":
	enregistrerChambreVue(reponse);
	break;
    case "lister":
	listerChambresVue(reponse);
	break;
    case "enlever":
	enleverChambreVue(reponse);
	break;
    case "afficheChambre":
	afficheChambreVue(reponse);
	break;
    case "enleverimage":
	enleverImageChambreVue(reponse);
	break;
    case "updatechambre" :
	updateChambreVue(reponse);
	break;
    }
};
