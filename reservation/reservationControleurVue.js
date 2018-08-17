function newReservation(reponse) {
	if (reponse.error == "") {
		$('#date_debut').val("");
		$('#date_fin').val("");
		$('#type_animal').val("");
		$('#type_chambre').val("");
		$('#exigences').val("");
		$('#reserv_service_list').val("");
		$('#calculation_de_prix').val("");
		$('#reservparam').hide();
		$('#modal_reservation').modal({
		    keyboard: true
		  })
	} else {
		$('#divfaireReservation .panel-footer').html(reponse.error);
	}
}

function listerReservationVue(reponse){
    var listeReservations = reponse.reservations;
    var res = "";
    res += "<table class=\"table nav-text mt-4\">";
    res += "<thead>";
    res += "<tr>";
    res += "<th>No</th>";
    res += "<th>Debut</th>";
    res += "<th>Fin</th>";
    res += "<th>Animal</th>";
    res += "<th>Chambre</th>";
    res += "<th>Prix</th>";
    res += "<th></th>";
    res += "</tr>";
    res += "</thead>";
    res += "<tbody style=\"font-size:13px\">";
    var taille = listeReservations.length;
	for(var i=0; i<taille; i++){
		res += "<tr><td>"+ listeReservations[i].idr +"</td>";
		res += "<td>"+ listeReservations[i].date_debut +"</td>";
		res += "<td>"+ listeReservations[i].date_fin +"</td>";
		res += "<td>"+ listeReservations[i].type_animal +"</td>";
		res += "<td>"+ listeReservations[i].type_chambre +"</td>";
		res += "<td>"+ listeReservations[i].prix +"</td>";
		if (joursAvant(listeReservations[i].date_fin) < -2){
        		if (listeReservations[i].annule == 0){
        			res += "<td><button type=\"button\" class=\"btn btn-envoyer bg-block-body mb-3\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\" onclick=\"attachonclick("+listeReservations[i].idr+")\">Annuler</button></td></tr>";
        		}
        		else {
        			res += "<td><p>Annulé</p></td></tr>";
        		}
		}else {
		    	if (listeReservations[i].annule == 0){
		    	    	res += "<td><p>Terminé</p></td></tr>";
        		}
        		else {
        			res += "<td><p>Annulé</p></td></tr>";
        		}
		}
	}
    res += "</tbody>";
    res += "</table>";
    $('#Reservation_user').html(res);
}

function annulerReservationVue(reponse){
	listerReservation();
}

function laisserOpinion(reponse){
	var listeReservations = reponse.reservations;
	var res = "";
    var taille = listeReservations.length;
	for(var i=0; i<taille; i++){
		res += "<option value='"+listeReservations[i].idr+"'>"+ listeReservations[i].date_debut + " - " + listeReservations[i].date_fin +"-"+listeReservations[i].type_animal+"-"+listeReservations[i].type_chambre+"</option>";
		//if(listeResrvation)
	}
   $('#reservation').html(res);
}

function ecrireopinione(reponse){
	if (reponse.error == "") {
		$('#reservation').val("");
		$('#descr_temoign').val("");
		$('#rateit').val("");
		$('#selectedFilesNewOpinion').children().remove();
		$('#imagesNewOpinion').val("");
	// showMainPage();
	} else {
		$('#laisserOpinion .panel-footer').html(reponse.error);
	}

}

function chambreVue(reponse){
	var listechambres = reponse.resultCh;
	var listeservice = reponse.resultService;
	var res = "";
	var rep = "";
    var taille1 = listechambres.length;
    var taille2 = listeservice.length;

    for(var i=0; i<taille1; i++){
		res += "<option value='"+listechambres[i].idch+"'";
		if(reponse.disponible[i].result ==0){
			res += " disabled>"+ listechambres[i].type_chambre + " (non disponible)</option>";
		}else {
			res += " data-jour='"+listechambres[i].prix_jour+"' data-semaine='"+listechambres[i].prix_semaine+"' data-mois='"+listechambres[i].prix_mois+"'>"+ listechambres[i].type_chambre + " (prix par jour de " + (listechambres[i].prix_mois/30).toFixed(2) + "$ jusqu`a " +listechambres[i].prix_jour + "$) " + "</option>";
		}

	}

    for(var i=0; i<taille2; i++){
	rep += "<div class=\"form-group row\">"
	rep += "<label for='"+listeservice[i].nom_service+listeservice[i].ids+"' class=\"col-4 col-form-label\">"+listeservice[i].nom_service+" ("+listeservice[i].prix_service+"$)</label>";
	rep += "<div class=\"col-8\">";
	rep += "<input type='number' min='0' max='1000' step='1' data-prix='"+listeservice[i].prix_service+"' class=\"form-control list_of_services\" id='"+listeservice[i].nom_service+listeservice[i].ids+"' name='s-"+listeservice[i].ids+"' value='0' onchange='prixChambre();' required>";
	rep += "</div>";
	rep += "</div>";
	//rep += "<option value='"+listeservice[i].ids+"' data-prix='"+listeservice[i].prix_service+"'>"+ listeservice[i].nom_service + "</option>";
    }

   $('#type_chambre').html(res);
   $('#reserv_service_list').html(rep);
   prixChambre();
}

var reservationVue = function(reponse) {
	var action = reponse.action;
	switch (action) {
	case "enregistrer":
		newReservation(reponse);
		break;
	case "lister":
		listerReservationVue(reponse);
		break;
	case "annuler":
		annulerReservationVue(reponse);
		break;
	case "listereservidu":
		laisserOpinion(reponse);
		break;
	case "opinion":
		ecrireopinione(reponse);
		break;
	case "reste":
		chambreVue(reponse);
		break;
	}
};
