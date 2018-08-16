function ficheAjouterChambre(){
    var formChambre = new FormData();
	formChambre.append('action', 'ficheajoutechambre');
	$.ajax({
	    type : 'POST',
	    url : 'chambreControleur.php',
	    data : formChambre,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		chambreVue(reponse);
	    },
	    fail : function(err) {
		$('#chambre_ajouter .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#chambre_ajouter .footer').html(""); }, 5000);
	    }
	});
}

function ajouterChambre(){
    var formChambre = new FormData(document.getElementById('formAjouterChambre'));
	formChambre.append('action', 'enregistrer');
	$.ajax({
	    type : 'POST',
	    url : 'chambreControleur.php',
	    data : formChambre,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		chambreVue(reponse);
	    },
	    fail : function(err) {
		$('#chambre_ajouter .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#chambre_ajouter .footer').html(""); }, 5000);
	    }
	});
}

function listerChambres(){
    var formChambre = new FormData();
	formChambre.append('action', 'lister');
	$.ajax({
	    type : 'POST',
	    url : 'chambreControleur.php',
	    data : formChambre,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		chambreVue(reponse);
	    },
	    fail : function(err) {
		$('#chambre_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#chambre_lister .footer').html(""); }, 5000);
	    }
	});
}

function enleverChambre(ida){
    var formChambre = new FormData();
    	formChambre.append('ida', ida);
	formChambre.append('action', 'enlever');
	$.ajax({
	    type : 'POST',
	    url : 'chambreControleur.php',
	    data : formChambre,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		chambreVue(reponse);
	    },
	    fail : function(err) {
		$('#chambre_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#chambre_lister .footer').html(""); }, 5000);
	    }
	});
}

function ficheChambre(idch){
    var formChambre = new FormData();
	formChambre.append('idch', idch);
	formChambre.append('action', 'fiche');
	$.ajax({
	    type : 'POST',
	    url : 'chambreControleur.php',
	    data : formChambre,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		chambreVue(reponse);
	    },
	    fail : function(err) {
		$('#chambre_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#chambre_lister .footer').html(""); }, 5000);
	    }
	});
}

function enleverImageChambre(idi, idch){
    if ($('#listOfImagesInChambre > div').length > 1){
        var formChambre = new FormData();
      	formChambre.append('idi', idi);
      	formChambre.append('idch', idch);
       	formChambre.append('action', 'enleverimage');
       	$.ajax({
       	    type : 'POST',
       	    url : 'chambreControleur.php',
       	    data : formChambre,
       	    dataType : 'json', // text pour le voir en format de string
       	    // async : false,
       	    // cache : false,
       	    contentType : false,
       	    processData : false,
       	    success : function(reponse) {// alert(reponse);
       		chambreVue(reponse);
       	    },
       	    fail : function(err) {
       		$('#chambre_modifier .footer').html("<p class=\"pl-3 text-danger\">"+err+"</p>");
       		setTimeout(function(){ $('#chambre_modifier .footer').html(""); }, 5000);
       	    }
       	});
    }else {
	$('#chambre_modifier .footer').html("<p class=\"pl-3 text-primary\">Vous ne pouvez pas supprimer la dernière image de la chambre</p>");
	setTimeout(function(){ $('#chambre_modifier .footer').html(""); }, 5000);
    }
}

function updateChambre(){
    var formChambre = new FormData(document.getElementById('formModifierChambre'));
	formChambre.append('action', 'update');
	$.ajax({
	    type : 'POST',
	    url : 'chambreControleur.php',
	    data : formChambre,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		chambreVue(reponse);
	    },
	    fail : function(err) {
		$('#chambre_modifier .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#chambre_modifier .footer').html(""); }, 5000);
	    }
	});
}
