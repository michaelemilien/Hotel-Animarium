function reservationsByParameters(){
    var formReservation = new FormData(document.getElementById('form_sort_reservations'));
	formReservation.append('action', 'byparameters');
	$.ajax({
	    type : 'POST',
	    url : 'reservationControleur.php',
	    data : formReservation,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		$('#reservation_by_parameters .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#reservation_by_parameters .footer').html(""); }, 5000);
	    }
	});
}
function affichFormSortReservations(){
    var formReservation = new FormData();
	formReservation.append('action', 'ficheformsortreservations');
	$.ajax({
	    type : 'POST',
	    url : 'reservationControleur.php',
	    data : formReservation,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		$('#reservation_by_parameters .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#reservation_by_parameters .footer').html(""); }, 5000);
	    }
	});
}

function afficheReservation(idr){
    var formReservation = new FormData();
	formReservation.append('action', 'afficherReservation');
	formReservation.append('idr', idr);
	$.ajax({
	    type : 'POST',
	    url : 'reservationControleur.php',
	    data : formReservation,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		$('#reservation_by_parameters .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#reservation_by_parameters .footer').html(""); }, 5000);
	    }
	});
}
function annulerReservation(idr){
    var formReservation = new FormData();
	formReservation.append('action', 'annuler');
	formReservation.append('idr', idr);
	$.ajax({
	    type : 'POST',
	    url : 'reservationControleur.php',
	    data : formReservation,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {// alert(reponse);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		$('#reservation_by_parameters .footer').html("<p class=\"pl-3 text-primary\">"+err+"</p>");
		setTimeout(function(){ $('#reservation_by_parameters .footer').html(""); }, 5000);
	    }
	});
}
