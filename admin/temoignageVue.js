function listerTemoinVue(reponse) {
    var allTemoins = reponse.temoin;
    var res = "";
    res += "<table class=\"table nav-text mt-4\">";
    res += "<thead>";
    res += "<tr>";
    res += "<th>Id</th>";
    res += "<th>Rating</th>";
    res += "<th>Description</th>"
    res += "<th>Date</th>";
    res += "<th>Visible?</th>";
    res += "<th></th>";
    res += "</tr>";
    res += "</thead>";
    res += "<tbody>";
    var quantityOfServices = allTemoins.length;
    for (var i = 0; i < quantityOfServices; i++) {

	    res += "<tr>";
	    res += "<td>" + allTemoins[i].idt + "</td>";
	    res += "<td>" + allTemoins[i].rating + "</td>";
	    res += "<td>" + allTemoins[i].descr_temoign + "</td>";
	    res += "<td>" + allTemoins[i].date_temoign + "</td>";
	    res += "<td>";
	    if (allTemoins[i].afficher == 1){
		res += "OUI"
	    }else{
		res += "NON"
	    }
	    res += "</td>";
	    res += "<td><button type=\"button\" class=\"btn btn-envoyer bg-block-body mb-3\" onclick=\"showTemoin("
		    + allTemoins[i].idt + ", "+allTemoins[i].ida+", " +allTemoins[i].idr + ")\">Modifier</button></td>";
	    res += "</tr>";
    }
    res += "</tbody>";
    res += "</table>";
    $('#listerTemoignageBody').html(res);
}

function afficheTemoinVue(reponse){
    var user =reponse.user;
    var images = reponse.images;
    var temoin = reponse.temoin;
    var res = "";
    res += "<p class=\"pt-3 pl-4 nav-text\">User Id : " + user[0].idu+"</p>";
    res += "<p class=\"pl-4 nav-text\">Nom : " + user[0].nom+"</p>";
    res += "<p class=\"pl-4 nav-text\">Prenom : " + user[0].prenom+"</p>";
    res += "<p class=\"pl-4 nav-text\">Email : " + user[0].email+"</p>";
    res += "<p class=\"pl-4 nav-text\">Phone : " + user[0].phone+"</p>";
    res += "<div class='container'>";
    res += "<div class='row'>";
    for (var i=0; i<images.length; i++){
	res += "<div class=\"col-md-4 mb-3\"><div class=\"card\">";
	res += "<img src='../" + images[i].dossier + "/"
	+ images[i].fichier
	+ "' class=\"card-img-top\" alt='"
	+ images[i].descr_img + "'>";
	res += "<div class=\"card-body\">";
	res += "<p class=\"card-text\"><small>";
	res += images[i].descr_img;
	res += "</small></p>";
	res += "</div>";
	res += "</div></div>";
    }
    res += "</div>";
    res += "</div>";
    res += "<p class='pl-4 nav-text'>Rating : <span style='color: orange'>";
    for (var j=0; j<temoin[0].rating; j++){
	res += "&#x2605;";
    }
    res += "</span></p>";
    res += "<p class=\"pl-4 nav-text\">Date : "+temoin[0].date_temoign+"</p>";
    res += "<p class=\"pl-4 nav-text\">Description : "+temoin[0].descr_temoign+"</p>";
    res += "<form  id='formModifierTemoignage' method='post' action='javascript:updateTemoignage("+temoin[0].idt+")'>";
    res += "<div class='form-group pl-3 pr-3'>";
    res += "<label for='reponse_temoign' class='col-form-label nav-text'>Reponse:</label>";
    res += "<textarea id='reponse_temoign' name='reponse' class='form-control' rows='5'>";
    res += temoin[0].reponse+"</textarea>";
    res += "</div>";
    res += "<div class='form-group pl-3 pr-3'>";
    res += "<label for='rating' class='col-sm-4 col-form-label nav-text'>Visible?</label>";
    res += "<select id='affiche' name='affiche' class='form-control'>";
    if (temoin[0].afficher == 1){
	res += "<option value='0'>NON</option>";
	res += "<option value='1' selected>OUI</option>";
    }else{
	res += "<option value='0' selected>NON</option>";
	res += "<option value='1'>OUI</option>";
    }
    res += "</select>";
    res += "</div>";
    res += "<div class=\"container\">"
    res += "<button type='submit' class='btn btn-envoyer bg-block-body mb-3'>Envoyer</button>"
    res += "</div>";
    res += "</form>";
    $('#modifierTemoignageBody').html(res);
    $('#temoignage_modifier h2').text("Temoignage #"+temoin[0].idt);
}

function updateTemoinVue(reponse){
    showTemoinLister();
}




var temoinVue = function(reponse) {
    var action = reponse.action;
    switch (action) {
    case "lister" :
	listerTemoinVue(reponse);
	break;
    case "affichetemoin":
	afficheTemoinVue(reponse);
	break;
    case "update" :
	updateTemoinVue(reponse);
	break;
    }
};
