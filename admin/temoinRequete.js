function listerTemoignage(){
    var formTemoin = new FormData();
	formTemoin.append('action', 'lister');
	$.ajax({
	    type : 'POST',
	    url : 'temoinControleur.php',
	    data : formTemoin,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		temoinVue(reponse);
	    },
	    fail : function(err) {
		$('#temoignage_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#temoignage_lister .footer').html(""); }, 5000);
	    }
	});
}
function ficheTemogn(idt,ida,idr){
    var formTemoin = new FormData();
	formTemoin.append('idt', idt);
	formTemoin.append('ida', ida);
	formTemoin.append('idr', idr);
	formTemoin.append('action', 'fiche');
	$.ajax({
	    type : 'POST',
	    url : 'temoinControleur.php',
	    data : formTemoin,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		temoinVue(reponse);
	    },
	    fail : function(err) {
		$('#temoignage_lister .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#temoignage_lister .footer').html(""); }, 5000);
	    }
	});
}
function updateTemoignage(idt){
    var formTemoin = new FormData(document.getElementById('formModifierTemoignage'));
    formTemoin.append('idt', idt);
    formTemoin.append('action', 'modifier');
    $.ajax({
	type : 'POST',
	url : 'temoinControleur.php',
	data : formTemoin,
	dataType : 'json', // text pour le voir en format de string
	// async : false,
	// cache : false,
	contentType : false,
	processData : false,
	success : function(reponse) {// alert(reponse);
	    temoinVue(reponse);
	},
	fail : function(err) {
	    $('#temoignage_modifier .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
	    setTimeout(function(){ $('#temoignage_modifier .footer').html(""); }, 5000);
	}
    });
}
