function ficheSortReservationVue(reponse) {
    if (reponse.msg == "") {
	var chambres = reponse.chambres;
	var opt = "<option value='0' selected>All</option>";
	for (var i = 0; i < chambres.length; i++) {
	    opt += "<option value='" + chambres[i].idch + "'>"
		    + chambres[i].chambre + "</option>";
	}
	$('#chambre_sort_type').html(opt);
    } else {
	$('#reservation_by_parameters .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#reservation_by_parameters .footer').html("");
	}, 5000);
    }
}

function makeFiltration(reponse) {
    if (reponse.msg == "") {
	var reservations = reponse.reservations;
	var tr = "";
	for (var i = 0; i < reservations.length; i++) {
	    tr += "<tr>";
	    tr += "<td><a href=\"#\" onclick='showReservation("
		    + reservations[i].idr + ")'>" + reservations[i].idr
		    + "</a></td>";
	    tr += "<td><a href=\"#\" onclick='showReservation("
		    + reservations[i].idr + ")'>" + reservations[i].date_debut
		    + "</a></td>";
	    tr += "<td><a href=\"#\" onclick='showReservation("
		    + reservations[i].idr + ")'>" + reservations[i].date_fin
		    + "</a></td>";
	    tr += "<td><a href=\"#\" onclick='showReservation("
		    + reservations[i].idr + ")'>" + reservations[i].chambre
		    + "</a></td>";
	    tr += "<td><a href=\"#\" onclick='showReservation("
		    + reservations[i].idr + ")'>" + reservations[i].annule
		    + "</a></td>";
	    tr += "<td><a href=\"#\" onclick='showReservation("
		    + reservations[i].idr + ")'>" + reservations[i].username
		    + "</a></td>";
	    tr += "<td><a href=\"#\" onclick='showReservation("
		    + reservations[i].idr + ")'>" + reservations[i].prix
		    + "</a></td>";
	    tr += "</tr>";
	}
	$('#form_sort_reservations tbody').html(tr);
    } else {
	$('#reservation_by_parameters .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#reservation_by_parameters .footer').html("");
	}, 5000);
    }
}

function afficherReservationVue(reponse) {
    if (reponse.msg == "") {
	var reservation = reponse.reservation;
	var services=reponse.services;
	var rep = "";
	rep += "<p class=\"pt-3 pl-4\">" + reservation[0].chambre + "</p>";
	rep += "<p class=\"pl-4\">Date debut: " + reservation[0].date_debut
		+ "</p>";
	rep += "<p class=\"pl-4\">Date fin: " + reservation[0].date_fin
		+ "</p>";
	rep += "<p class=\"pl-4\">Nom: " + reservation[0].nom + "</p>";
	rep += "<p class=\"pl-4\">Prenom: " + reservation[0].prenom + "</p>";
	rep += "<p class=\"pl-4\">Phone: " + reservation[0].phone + "</p>";
	rep += "<p class=\"pl-4\">Exigences: " + reservation[0].exigences
		+ "</p>";
	if (reservation[0].annule == 1){
	    rep += "<p class=\"pl-4\">Deja annulé</p>";
	}else{
	    rep += "<button type=\"button\" data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-danger\" onclick=\"attachonclick("+reservation[0].idr+")\">Annuler reservation</button>";
	}

	rep += "<h3 class='text-center'>Services</h3>";
	rep += "<table class=\"table p-4\">";
	rep += "<thead><tr>";
	rep += "<td>Nom service</td>";
	rep += "<td>Prix</td>";
	rep += "<td>Quantité</td>";
	rep += "</tr></thead>";
	rep += "<tbody>";
	for (var i = 0; i < services.length; i++) {
	    rep += "<tr>";
	    rep += "<td>" + services[i].nom_service + "</td>";
	    rep += "<td>" + services[i].prix_service + "</td>";
	    rep += "<td>" + services[i].count_service + "</td>";
	    rep += "<tr>";
	}
	rep += "</tbody></table>";
	$('#modifierReservationBody').html(rep);
	$('#reservation_modifier h2')
		.html("Reservation #" + reservation[0].idr);
    } else {
	$('#reservation_modifier .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#reservation_modifier .footer').html("");
	}, 5000);
    }
}

function annulerReservationVue(reponse) {
    if (reponse.msg == "") {
	afficheReservation(reponse.idr);
    } else {
	$('#reservation_modifier .footer').html(
		"<p class=\"pl-3 text-primary\">" + reponse.msg + "</p>");
	setTimeout(function() {
	    $('#reservation_modifier .footer').html("");
	}, 5000);
    }
}

var reservationVue = function(reponse) {
    var action = reponse.action;
    switch (action) {
    case "ficheformsortreservations":
	ficheSortReservationVue(reponse);
	break;
    case "byparameters":
	makeFiltration(reponse);
	break;
    case "afficherReservation":
	afficherReservationVue(reponse);
	break;
    case "annuler":
	annulerReservationVue(reponse);
	break;
    }
};
