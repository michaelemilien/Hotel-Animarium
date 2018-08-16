function ajouterGalerie(){
    var formGalerie = new FormData(document.getElementById('formAjouterGallery'));
	formGalerie.append('action', 'enregistrer');
	$.ajax({
	    type : 'POST',
	    url : 'galeryControleur.php',
	    data : formGalerie,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		galeryVue(reponse);
	    },
	    fail : function(err) {
		$('#galerie_ajouter .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#galerie_ajouter .footer').html(""); }, 5000);
	    }
	});
}
function listerGaleries(){
    var formGalerie = new FormData();
	formGalerie.append('action', 'lister');
	$.ajax({
	    type : 'POST',
	    url : 'galeryControleur.php',
	    data : formGalerie,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		galeryVue(reponse);
	    },
	    fail : function(err) {
		$('#galerie_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#galerie_lister .footer').html(""); }, 5000);
	    }
	});
}

function enleverGaleries(ida){
    var formGalerie = new FormData();
    	formGalerie.append('ida', ida);
	formGalerie.append('action', 'enlever');
	$.ajax({
	    type : 'POST',
	    url : 'galeryControleur.php',
	    data : formGalerie,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		galeryVue(reponse);
	    },
	    fail : function(err) {
		$('#galerie_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#galerie_lister .footer').html(""); }, 5000);
	    }
	});
}

function enleverImageGalery(idi, idg){
    if ($('#listOfImagesInGalery > div').length > 1){
        var formGalerie = new FormData();
      	formGalerie.append('idi', idi);
      	formGalerie.append('idg', idg);
       	formGalerie.append('action', 'enleverimage');
       	$.ajax({
       	    type : 'POST',
       	    url : 'galeryControleur.php',
       	    data : formGalerie,
       	    dataType : 'json', // text pour le voir en format de string
       	    // async : false,
       	    // cache : false,
       	    contentType : false,
       	    processData : false,
       	    success : function(reponse) {// alert(reponse);
       		galeryVue(reponse);
       	    },
       	    fail : function(err) {
       		$('#galerie_modifier .footer').html("<p class=\"pl-3 text-danger\">"+err+"</p>");
       		setTimeout(function(){ $('#galerie_modifier .footer').html(""); }, 5000);
       	    }
       	});
    }else {
	$('#galerie_modifier .footer').html("<p class=\"pl-3 text-primary\">Vous ne pouvez pas supprimer la dernière image de la galerie</p>");
	setTimeout(function(){ $('#galerie_modifier .footer').html(""); }, 5000);
    }
}

function ficheGalerie(idg){
    var formGalerie = new FormData();
	formGalerie.append('idg', idg);
	formGalerie.append('action', 'fiche');
	$.ajax({
	    type : 'POST',
	    url : 'galeryControleur.php',
	    data : formGalerie,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		galeryVue(reponse);
	    },
	    fail : function(err) {
		$('#galerie_ajouter .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#galerie_ajouter .footer').html(""); }, 5000);
	    }
	});
}
function updateGalery(){
    var formGalerie = new FormData(document.getElementById('formModifierGalerie'));
	formGalerie.append('action', 'update');
	$.ajax({
	    type : 'POST',
	    url : 'galeryControleur.php',
	    data : formGalerie,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		galeryVue(reponse);
	    },
	    fail : function(err) {
		$('#galerie_modifier .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#galerie_modifier .footer').html(""); }, 5000);
	    }
	});
}
