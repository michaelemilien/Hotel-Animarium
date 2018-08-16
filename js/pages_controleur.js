function showGaleryLister(){
    listerGaleries();
    //showWindow("galerie_lister");
}
function showServiceLister(){
    listerServices();
    //showWindow("galerie_lister");
}
function showChambreAjouter(){
    showWindow("chambre_ajouter");
    ficheAjouterChambre();
}
function showChambreLister(){
    showWindow("chambre_lister");
    listerChambres();
}
function showChambreModifier(idch){
    showWindow("chambre_modifier");
    ficheChambre(idch);
}
function showFormSortReservations(){
    showWindow("reservation_by_parameters");
    affichFormSortReservations();
}
function showReservation(idr){
    showWindow("reservation_modifier");
    afficheReservation(idr)
}
function showTemoinLister(){
    showWindow("temoignage_lister");
    listerTemoignage();
}
function showTemoin(idt,ida,idr){
    showWindow("temoignage_modifier");
    ficheTemogn(idt,ida,idr);
}
