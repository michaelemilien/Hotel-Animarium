<?php
  session_start();


$bar = <<<EOT
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Animarium admin page</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="../css/bootstrap.min.css">
<link rel="stylesheet" href="../css/admin.css">
<link rel="icon" type="image/png" href="../favicon.ico">
<script src="../js/jquery.min.js"></script>
<script src="../js/popper.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/files_multiple.js"></script>
<script src="admin.js"></script>
<script src="galerieRequete.js"></script>
<script src="galeryVue.js"></script>
<script src="serviceRequete.js"></script>
<script src="serviceVue.js"></script>
<script src="chambreRequete.js"></script>
<script src="chambreVue.js"></script>
<script src="reservationRequete.js"></script>
<script src="reservationVue.js"></script>
<script src="temoinRequete.js"></script>
<script src="temoignageVue.js"></script>
<script src="../js/pages_controleur.js"></script>


</head>
<body class="bg-main-space">
    <h1 style="color:#3C3022; text-shadow: 2px 2px 2px #333; text-align: center;">Animarium - espace administration</h1>
	<div class="container-fluid">
		<div class="row">
			<!-- Left sidebar -->
			<div class="col-md-3 col-xs-1 shadowed p-0" id="sidebar">
				<ul id="accordion1"
					class="nav nav-pills flex-column bg-nav-light h-100">
					<li class="nav-item"><a class="nav-link nav-text"
						data-toggle="collapse" href="#item-1" data-parent="#accordion1">&#x25B8; Galeries</a>
						<div id="item-1" class="collapse show">
							<ul class="nav flex-column pl-3 bg-nav-dark">
								<li class="nav-item"><a class="nav-link nav-text" href="#"
									onclick="showWindow('galerie_ajouter');">&#x271A; Ajouter</a></li>
								<li class="nav-item"><a class="nav-link nav-text" href="#"
									onclick="showGaleryLister(); showWindow('galerie_lister');">&#x2637;
										Lister</a></li>
							</ul>
						</div></li>
					<li class="nav-item"><a class="nav-link nav-text"
						data-toggle="collapse" href="#item-2" data-parent="#accordion1">&#x25B8; Service</a>
						<div id="item-2" class="collapse">
							<ul class="nav flex-column pl-3 bg-nav-dark">
								<li class="nav-item"><a class="nav-link nav-text" href="#"
									onclick="showWindow('service_ajouter');">&#x271A; Ajouter</a></li>
								<li class="nav-item"><a class="nav-link nav-text" href="#"
									onclick="showServiceLister(); showWindow('service_lister');">&#x2637; Lister</a></li>
							</ul>
						</div></li>
					<li class="nav-item"><a class="nav-link nav-text"
						data-toggle="collapse" href="#item-3" data-parent="#accordion1">&#x25B8; Chambres</a>
						<div id="item-3" class="collapse">
							<ul class="nav flex-column pl-3 bg-nav-dark">
								<li class="nav-item"><a class="nav-link nav-text" href="#"
									onclick="showChambreAjouter();">&#x271A; Ajouter</a></li>
								<li class="nav-item"><a class="nav-link nav-text" href="#"
									onclick="showChambreLister();">&#x2637; Lister</a></li>
							</ul>
						</div></li>
					<li class="nav-item"><a class="nav-link nav-text"
						data-toggle="collapse" href="#item-4" data-parent="#accordion1">&#x25B8; Reservations</a>
						<div id="item-4" class="collapse">
							<ul class="nav flex-column pl-3 bg-nav-dark">
								<li class="nav-item"><a class="nav-link nav-text" href="#"
									onclick="showFormSortReservations();">&#x2637; Lister par parametres</a></li>
							</ul>
						</div></li>
					<li class="nav-item"><a class="nav-link nav-text"
						data-toggle="collapse" href="#item-5" data-parent="#accordion1">&#x25B8; Témoignages</a>
						<div id="item-5" class="collapse">
							<ul class="nav flex-column pl-3 bg-nav-dark">
								<li class="nav-item"><a class="nav-link nav-text" href="#" onclick="showTemoinLister();">&#x2637; Lister</a></li>
							</ul>
						</div></li>
				</ul>
			</div>
			<!-- End left sidebar -->
			<div class="col-md-9 col-xs-11">
				<!-- Block Galerie ajouter -->
				<div id="galerie_ajouter" class="container p-3"
					style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Ajouter galerie</h2>
						</div>
						<div class="container bg-block-body">
							<form action="javascript:ajouterGalerie()"
								id="formAjouterGallery" onsubmit="return validateFormGalerie()"
								enctype="multipart/form-data" method="post">
								<div class="form-group row p-3">
									<label for="nom_galery_ajouter"
										class="col-2 col-form-label nav-text">Galery nom</label>
									<div class="col-10">
										<input id="nom_galery_ajouter" name="nom_galery"
											class="form-control" type="text" placeholder="Galery nom"
											required />
									</div>
								</div>
								<div class="form-group row p-3">
									<label for="imagesNewGalerie"
										class="col-2 col-form-label nav-text">Images</label>
									<div class="col-10">
										<input type="file"
											data-multiple-caption="{count} files selected"
											name="images[]" id="imagesNewGalerie" class="nav-text"
											multiple accept='image/*'>
									</div>
								</div>
								<div class="container">
									<div class="row justify-content-start"
										id="selectedFilesNewGalery"></div>
								</div>
								<div class="container">
									<button type="submit"
										class="btn btn-envoyer bg-block-body mb-3">Envoyer</button>
								</div>
							</form>
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Galerie ajouter -->
				<!-- Block Galerie modifier -->
				<div id="galerie_modifier" class="container p-3"
					style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Modifier galerie</h2>
						</div>
						<div class="container bg-block-body" id="modifierGaleryBody">
							<div class="container mb-3">
								<form id='formModifierGalerie' enctype="multipart/form-data"
									method="post" action="javascript:updateGalery()">
									<div class='form-group mt-3 mb-3'>
										<input type='text' class='form-control form-control-lg'
											value="" id="nameModifiedGalery" name="nom_galery" required>
									</div>
									<div class="row justify-content-start"
										id="listOfImagesInGalery"></div>
									<hr>
									<h2 class='text-center nav-text mt-3 mb-3'>Ajouter images
										en galerie</h2>
									<div class="form-group row p-3">
										<label for="imagesUpdateGalerie"
											class="col-2 col-form-label nav-text">Images</label>
										<div class="col-10">
											<input type="file"
												data-multiple-caption="{count} files selected"
												name="images[]" id="imagesUpdateGalerie" class="nav-text"
												multiple accept='image/*'>";
										</div>
									</div>
									<div class="container">
										<div class="row justify-content-start"
											id="selectedFilesUpdateGalery"></div>
									</div>
									<div class="container">
										<button type="submit"
											class="btn btn-envoyer bg-block-body mb-3">Envoyer</button>
									</div>
								</form>
							</div>
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>

				</div>
				<!-- END Block Galerie modifier -->
				<!-- Block Galerie lister -->
				<div id="galerie_lister" class="container p-3"
					style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Toutes les galeries</h2>
						</div>
						<div class="container bg-block-body" id="listerGaleryBody">

						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Galerie lister -->
				<!-- Block Service lister -->
				<div id="service_lister" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Toutes les services</h2>
						</div>
						<div class="container bg-block-body" id="listerServicesBody">

						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Service lister -->
				<!-- Block Service modifier -->
				<div id="service_modifier" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Modifier service</h2>
						</div>
						<div class="container bg-block-body" id="modifierServiceBody">
							<div class="container mb-3">
								<form id='formModifierService' enctype="multipart/form-data"
									method="post" action="javascript:updateService()">
									<div class='form-group mt-3 mb-3'>
										<input type='text' class='form-control form-control-lg'
											value="" id="nameModifiedService" name="nom_service" required>
									</div>
									<div class='form-group mt-3 mb-3'>
										<textarea class='form-control form-control-lg'
											id="descrModifiedService" name="descr_service" required></textarea>
									</div>
									<div class='form-group mt-3 mb-3'>
										<input type='number' min='0' max='100000' step='0.01'
											class='form-control form-control-lg' value=""
											id="prixModifiedService" name="prix_service" required>
									</div>
									<div class="row justify-content-start"
										id="listOfImagesInService"></div>
									<hr>
									<h2 class='text-center nav-text mt-3 mb-3'>Ajouter images
										en service</h2>
									<div class="form-group row p-3">
										<label for="imagesUpdateService"
											class="col-2 col-form-label nav-text">Images</label>
										<div class="col-10">
											<input type="file"
												data-multiple-caption="{count} files selected"
												name="images[]" id="imagesUpdateService" class="nav-text"
												multiple accept='image/*'>";
										</div>
									</div>
									<div class="container">
										<div class="row justify-content-start"
											id="selectedFilesUpdateService"></div>
									</div>
									<div class="container">
										<button type="submit"
											class="btn btn-envoyer bg-block-body mb-3">Envoyer</button>
									</div>
								</form>
							</div>
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Service modifier -->
				<!-- Block Service ajouter -->
				<div id="service_ajouter" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Ajouter service</h2>
						</div>
						<div class="container bg-block-body">
							<form action="javascript:ajouterService()"
								id="formAjouterService" onsubmit="return validateFormService()"
								enctype="multipart/form-data" method="post">
								<div class="form-group row p-3">
									<label for="nom_service_ajouter"
										class="col-2 col-form-label nav-text">Service nom</label>
									<div class="col-10">
										<input id="nom_service_ajouter" name="nom_service"
											class="form-control" type="text" placeholder="Service nom"
											required />
									</div>
								</div>
								<div class="form-group row p-3">
									<label for="descr_service_ajouetr"
										class="col-2 col-form-label nav-text">Service
										description</label>
									<div class="col-10">
										<textarea id="descr_service_ajouter" name="descr_service"
											class="form-control" placeholder="Service description"
											required></textarea>
									</div>
								</div>
								<div class="form-group row p-3">
									<label for="prix_service_ajouetr"
										class="col-2 col-form-label nav-text">Service prix</label>
									<div class="col-10">
										<input type="number" min="0" max="100000" step="0.01"
											id="prix_service_ajouter" name="prix_service"
											class="form-control" placeholder="Service prix" required />
									</div>
								</div>
								<div class="form-group row p-3">
									<label for="imagesNewService"
										class="col-2 col-form-label nav-text">Images</label>
									<div class="col-10">
										<input type="file"
											data-multiple-caption="{count} files selected"
											name="images[]" id="imagesNewService" class="nav-text"
											multiple accept='image/*'>
									</div>
								</div>
								<div class="container">
									<div class="row justify-content-start"
										id="selectedFilesNewService"></div>
								</div>
								<div class="container">
									<button type="submit"
										class="btn btn-envoyer bg-block-body mb-3">Envoyer</button>
								</div>
							</form>
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>

				</div>
				<!-- END Block Service modifier -->
				<!-- Block Chambre ajouter -->
				<div id="chambre_ajouter" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Ajouter chambre</h2>
						</div>
						<div class="container bg-block-body">
							<form action="javascript:ajouterChambre()"
								id="formAjouterChambre" onsubmit="return validateFormChambre()"
								enctype="multipart/form-data" method="post">
								<div class="form-group row p-1">
									<label for="type_chambre_ajouter"
										class="col-2 col-form-label nav-text">Chambre type</label>
									<div class="col-10">
										<select class="form-control" id="type_chambre_ajouter"
											name="idtch">
										</select>
									</div>
								</div>

								<div class="form-group row p-1">
									<label for="animal_chambre_ajouter"
										class="col-2 col-form-label nav-text">Animal type</label>
									<div class="col-10">
										<select class="form-control" id="animal_chambre_ajouter"
											name="idan">
										</select>
									</div>
								</div>

								<div class="form-group row p-1">
									<label for="desc_chambre_ajouter"
										class="col-2 col-form-label nav-text">Chambre
										description</label>
									<div class="col-10">
										<textarea id="desc_chambre_ajouter" placeholder="Description"
											name="desc_chambre" class="form-control" required></textarea>
									</div>
								</div>
								<div class="form-group row p-1">
									<label for="places_chambre_ajouter"
										class="col-2 col-form-label nav-text">Numero de places</label>
									<div class="col-10">
										<input id="places_chambre_ajouter" name="places"
											class="form-control" type="number" min="0" max="9999"
											step="1" placeholder="Numero de places" required />
									</div>
								</div>
								<div class="form-group row p-1">
									<label for="prix_jour_chambre_ajouter"
										class="col-2 col-form-label nav-text">Prix par jour</label>
									<div class="col-10">
										<input id="prix_jour_chambre_ajouter" name="prix_jour"
											class="form-control" type="number" min="1" max="99999999"
											step="0.01" placeholder="Prix par jour" required />
									</div>
								</div>
								<div class="form-group row p-1">
									<label for="prix_semain_chambre_ajouter"
										class="col-2 col-form-label nav-text">Prix par semain</label>
									<div class="col-10">
										<input id="prix_semain_chambre_ajouter" name="prix_semaine"
											class="form-control" type="number" min="1" max="99999999"
											step="0.01" placeholder="Prix par semain" required />
									</div>
								</div>
								<div class="form-group row p-1">
									<label for="prix_mois_chambre_ajouter"
										class="col-2 col-form-label nav-text">Prix par mois</label>
									<div class="col-10">
										<input id="prix_mois_chambre_ajouter" name="prix_mois"
											class="form-control" type="number" min="1" max="99999999"
											step="0.01" placeholder="Prix par mois" required />
									</div>
								</div>


								<div class="form-group row p-1">
									<label for="imagesNewChambre"
										class="col-2 col-form-label nav-text">Images</label>
									<div class="col-10">
										<input type="file"
											data-multiple-caption="{count} files selected"
											name="images[]" id="imagesNewChambre" class="nav-text"
											multiple accept='image/*'>
									</div>
								</div>
								<div class="container">
									<div class="row justify-content-start"
										id="selectedFilesNewChambre"></div>
								</div>
								<div class="container">
									<button type="submit"
										class="btn btn-envoyer bg-block-body mb-3">Envoyer</button>
								</div>
							</form>
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Chambre ajouter -->
				<!-- Block Chambre lister -->
				<div id="chambre_lister" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Toutes les chambres</h2>
						</div>
						<div class="container bg-block-body" id="listerChambresBody">

						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>

				</div>
				<!-- END Block Chambre lister -->
				<!-- Block Chambre modifier -->
				<div id="chambre_modifier" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Modifier chambre</h2>
						</div>
						<div class="container bg-block-body" id="modifierChambreBody">
							<div class="container mb-3">
								<form id='formModifierChambre' enctype="multipart/form-data"
									method="post" action="javascript:updateChambre()">
									<div class="form-group row p-1">
										<label for="type_chambre_modifier"
											class="col-2 col-form-label nav-text">Chambre type</label>
										<div class="col-10">
											<select class="form-control" id="type_chambre_modifier"
												name="idtch" disabled>
											</select>
										</div>
									</div>

									<div class="form-group row p-1">
										<label for="animal_chambre_modifier"
											class="col-2 col-form-label nav-text">Animal type</label>
										<div class="col-10">
											<select class="form-control" id="animal_chambre_modifier"
												name="idan" disabled>
											</select>
										</div>
									</div>

									<div class="form-group row p-1">
										<label for="desc_chambre_modifier"
											class="col-2 col-form-label nav-text">Chambre
											description</label>
										<div class="col-10">
											<textarea id="desc_chambre_modifier"
												placeholder="Description" name="desc_chambre"
												class="form-control" required></textarea>
										</div>
									</div>
									<div class="form-group row p-1">
										<label for="places_chambre_modifier"
											class="col-2 col-form-label nav-text">Numero de
											places</label>
										<div class="col-10">
											<input id="places_chambre_modifier" name="places"
												class="form-control" type="number" min="0" max="9999"
												step="1" placeholder="Numero de places" required />
										</div>
									</div>
									<div class="form-group row p-1">
										<label for="prix_jour_chambre_modifier"
											class="col-2 col-form-label nav-text">Prix par jour</label>
										<div class="col-10">
											<input id="prix_jour_chambre_modifier" name="prix_jour"
												class="form-control" type="number" min="1" max="99999999"
												step="0.01" placeholder="Prix par jour" required />
										</div>
									</div>
									<div class="form-group row p-1">
										<label for="prix_semain_chambre_modifier"
											class="col-2 col-form-label nav-text">Prix par semain</label>
										<div class="col-10">
											<input id="prix_semain_chambre_modifier" name="prix_semaine"
												class="form-control" type="number" min="1" max="99999999"
												step="0.01" placeholder="Prix par semain" required />
										</div>
									</div>
									<div class="form-group row p-1">
										<label for="prix_mois_chambre_modifier"
											class="col-2 col-form-label nav-text">Prix par mois</label>
										<div class="col-10">
											<input id="prix_mois_chambre_modifier" name="prix_mois"
												class="form-control" type="number" min="1" max="99999999"
												step="0.01" placeholder="Prix par mois" required />
										</div>
									</div>
									<div class="row justify-content-start"
										id="listOfImagesInChambre"></div>
									<hr>
									<h2 class='text-center nav-text mt-3 mb-3'>Ajouter images
										en chambre</h2>
									<div class="form-group row p-3">
										<label for="imagesUpdateChambre"
											class="col-2 col-form-label nav-text">Images</label>
										<div class="col-10">
											<input type="file"
												data-multiple-caption="{count} files selected"
												name="images[]" id="imagesUpdateChambre" class="nav-text"
												multiple accept='image/*'>";
										</div>
									</div>
									<div class="container">
										<div class="row justify-content-start"
											id="selectedFilesUpdateChambre"></div>
									</div>
									<div class="container">
										<button type="submit"
											class="btn btn-envoyer bg-block-body mb-3">Envoyer</button>
									</div>
								</form>
							</div>
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Chambre modifier -->
				<!-- Block Reservation lister -->
				<div id="reservation_by_parameters" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">Recherche des chambres</h2>
						</div>
						<div class="container bg-block-body" id="listerChambresBody">
							<form id="form_sort_reservations" method="post"
								action="javascript:reservationsByParameters()">
								<table class="table" id="table_sort_reservations">
									<thead>
										<tr>
											<th></th>
											<th><input type="date" class="form-control"
												id="reservation_sort_from_date" name="date_begin"></input></th>
											<th><input type="date" class="form-control"
												id="reservation_sort_befor_date" name="date_end"></input></th>
											<th><select class="form-control" id="chambre_sort_type"
												name="idch"></select></th>

											<th><select class="form-control"
												id="reservation_sort_annule" name="annule">
													<option value=1>Non</option>
													<option value=2>Oui</option>
													<option value=3 selected>Tous</option>
											</select></th>
											<th><input class="form-control"
												id="reservations_sort_pseudo" name="login" type="text"
												placeholder="Pseudo" /></th>
											<th>
												<button type="button" class="btn btn-light"
													onclick="reservationsByParameters()">&#x1F50D;</button>
											</th>
										</tr>
										<tr>
											<th>Id</th>
											<th>Date debut</th>
											<th>Date fin</th>
											<th>Chambre</th>
											<th>Annulé</th>
											<th>User</th>
											<th>Prix</th>
										</tr>
									</thead>
									<tfoot>
									</tfoot>
									<tbody>
									</tbody>
								</table>
							</form>
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Reservation lister -->
				<!-- Block Reservations modifier -->
				<div id="reservation_modifier" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text"></h2>
						</div>
						<div class="container bg-block-body" id="modifierReservationBody">

						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Reservation modifier -->
				<!-- Block Temoignage lister -->
				<div id="temoignage_lister" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text">List des temoignages</h2>
						</div>
						<div class="container bg-block-body" id="listerTemoignageBody">
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block temoignage lister -->
				<!-- Block Temoignages modifier -->
				<div id="temoignage_modifier" style="display: none;">
					<div class="container shadowed bg-block-body p-0">
						<div class="container m-0 p-2 bg-block-footer">
							<h2 class="text-center nav-text"></h2>
						</div>
						<div class="container bg-block-body" id="modifierTemoignageBody">
						</div>
						<div class="container m-0 p-1 bg-block-footer footer"></div>
					</div>
				</div>
				<!-- END Block Temoignages modifier -->
			</div>
		</div>
	</div>
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Attention!</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">...</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" id="confirmationModal">Oui</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
EOT;

if (!isset($_SESSION['role']) || (empty($_SESSION['role'])) || ($_SESSION['role'] != "ADMIN")) {
    echo "<h2>Cette page pour l`administrateur</h2>";
    echo "<br><br><a href='../index.html'>Page d'accueil</a>";
}else {
    echo $bar;
}
?>
