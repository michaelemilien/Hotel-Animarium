function faireReservation(){
	var formReservation = new FormData(document.getElementById('formReservation'));
	formReservation.append('action', 'registration');
	$.ajax({
	    type : 'POST',
	    url : '../reservation/reservationControleur.php',
	    data : formReservation,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {
		//alert("reponse: " + reponse.e);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		alert("error in ajax user reservation:" + err);
	    }
	});
}

function listerReservation(){
	var formReservation = new FormData();
	formReservation.append('action', 'lister');
	$.ajax({
	    type : 'POST',
	    url : '../reservation/reservationControleur.php',
	    data : formReservation,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {
		// alert("reponse: " + reponse.e);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		alert("error in ajax reservation:" + err);
	    }
	});
}

function annulerReservation(idr){
	var formReservation = new FormData();
	formReservation.append('action','annuler');
	formReservation.append('idr', idr);
	$.ajax({
		type : 'POST',
		url : '../reservation/reservationControleur.php',
		data : formReservation,
		dataType : 'json',
		contentType : false,
		processData : false,
		success : function(reponse){
			reservationVue(reponse);
		},
		fail : function(err){
			alert("error in ajax reservation:" +err);
		}
	});
}

function donnerOpinion(){
	var formReservation = new FormData();
	formReservation.append('action','listereservidu');
	$.ajax({
		type : 'POST',
		url : '../reservation/reservationControleur.php',
		data : formReservation,
		dataType : 'json',
		contentType : false,
		processData : false,
		success : function(reponse){
			reservationVue(reponse);
		},
		fail : function(err){
			alert("error in ajax reservation:" +err);
		}
	});

}

function ecrireopinion(){
	var formOpinion = new FormData(document.getElementById('formDonnerOpinion'));
	formOpinion.append('action', 'opinion');
	$.ajax({
	    type : 'POST',
	    url : '../reservation/reservationControleur.php',
	    data : formOpinion,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {
		// alert("reponse: " + reponse.e);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		alert("error in ajax user reservation:" + err);
	    }
	});
}

function ResteChambre(date_debut,date_fin,idan){
	var formResteCh = new FormData();
	formResteCh.append('action', 'reste');
	formResteCh.append('date_debut', date_debut);
	formResteCh.append('date_fin', date_fin);
	formResteCh.append('idan', idan);
	$.ajax({
	    type : 'POST',
	    url : '../reservation/reservationControleur.php',
	    data : formResteCh,
	    dataType : 'json', // text pour le voir en format de string
	    // async : false,
	    // cache : false,
	    contentType : false,
	    processData : false,
	    success : function(reponse) {
		//alert("reponse: " + reponse);
		reservationVue(reponse);
	    },
	    fail : function(err) {
		alert("error in ajax reservation:" + err);
	    }
	});
}

function requete(){ // calcule prix

}
