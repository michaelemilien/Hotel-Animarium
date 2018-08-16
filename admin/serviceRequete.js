function ajouterService(){
    var formService = new FormData(document.getElementById('formAjouterService'));
	formService.append('action', 'enregistrer');
	$.ajax({
	    type : 'POST',
	    url : 'serviceControleur.php',
	    data : formService,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		serviceVue(reponse);
	    },
	    fail : function(err) {
		$('#service_ajouter .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#service_ajouter .footer').html(""); }, 5000);
	    }
	});
}
function listerServices(){
    var formService = new FormData();
	formService.append('action', 'lister');
	$.ajax({
	    type : 'POST',
	    url : 'serviceControleur.php',
	    data : formService,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		serviceVue(reponse);
	    },
	    fail : function(err) {
		$('#service_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#service_lister .footer').html(""); }, 5000);
	    }
	});
}

function enleverService(ida){
    var formService = new FormData();
    	formService.append('ida', ida);
	formService.append('action', 'enlever');
	$.ajax({
	    type : 'POST',
	    url : 'serviceControleur.php',
	    data : formService,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		serviceVue(reponse);
	    },
	    fail : function(err) {
		$('#service_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#service_lister .footer').html(""); }, 5000);
	    }
	});
}

function ficheService(ids){
    var formService = new FormData();
	formService.append('ids', ids);
	formService.append('action', 'fiche');
	$.ajax({
	    type : 'POST',
	    url : 'serviceControleur.php',
	    data : formService,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		serviceVue(reponse);
	    },
	    fail : function(err) {
		$('#service_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#service_lister .footer').html(""); }, 5000);
	    }
	});
}

function enleverImageService(idi, ids){
    if ($('#listOfImagesInService > div').length > 1){
        var formService = new FormData();
      	formService.append('idi', idi);
      	formService.append('ids', ids);
       	formService.append('action', 'enleverimage');
       	$.ajax({
       	    type : 'POST',
       	    url : 'serviceControleur.php',
       	    data : formService,
       	    dataType : 'json', // text pour le voir en format de string
       	    // async : false,
       	    // cache : false,
       	    contentType : false,
       	    processData : false,
       	    success : function(reponse) {// alert(reponse);
       		serviceVue(reponse);
       	    },
       	    fail : function(err) {
       		$('#service_modifier .footer').html("<p class=\"pl-3 text-danger\">"+err+"</p>");
       		setTimeout(function(){ $('#service_modifier .footer').html(""); }, 5000);
       	    }
       	});
    }else {
	$('#service_modifier .footer').html("<p class=\"pl-3 text-primary\">Vous ne pouvez pas supprimer la dernière image de le service</p>");
	setTimeout(function(){ $('#service_modifier .footer').html(""); }, 5000);
    }
}
function updateService(){
    var formService = new FormData(document.getElementById('formModifierService'));
	formService.append('action', 'update');
	$.ajax({
	    type : 'POST',
	    url : 'serviceControleur.php',
	    data : formService,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		serviceVue(reponse);
	    },
	    fail : function(err) {
		$('#service_modifier .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#service_modifier .footer').html(""); }, 5000);
	    }
	});
}
