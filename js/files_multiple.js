var selDiv = "";
var storedFiles = [];

$(document).ready(function() {
    $("#imagesNewGalerie").on("change", handleFileSelect);
    $("#imagesUpdateGalerie").on("change", handleFileSelect);
    $("#imagesNewService").on("change", handleFileSelect);
    $("#imagesUpdateService").on("change", handleFileSelect);
    $("#imagesNewChambre").on("change", handleFileSelect);
    $("#imagesUpdateChambre").on("change", handleFileSelect);
    $("#imagesNewOpinion").on("change", handleFileSelect);
});

function handleFileSelect(e) {
    switch (e.target.getAttribute('id')){
    case 'imagesNewGalerie':
	selDiv=$("#selectedFilesNewGalery");
	break;
    case 'imagesUpdateGalerie':
	selDiv=$('#selectedFilesUpdateGalery');
	break;
    case 'imagesNewService':
	selDiv=$('#selectedFilesNewService');
	break;
    case 'imagesUpdateService':
	selDiv=$('#selectedFilesUpdateService');
	break;
    case 'imagesNewChambre':
	selDiv=$('#selectedFilesNewChambre');
	break;
    case 'imagesUpdateChambre':
	selDiv=$('#selectedFilesUpdateChambre');
	break;
    case 'imagesNewOpinion':
	selDiv=$('#selectedFilesNewOpinion');
	break;
    }
    selDiv.children().remove();
    storedFiles = [];
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function(f) {

		if (!f.type.match("image.*")) {
		    return;
		}
		storedFiles.push(f);

		var reader = new FileReader();
		reader.onload = function(e) {
		    var html = "<div class=\"col-md-4 mb-3\"><div class=\"card\"><img src=\""
			    + e.target.result
			    + "\" data-file='"
			    + f.name
			    + "' class='selFile card-img-top' style='height: 150px;'><div class=\"card-body\"><p class=\"card-text\"><small>Name: "
			    + f.name.slice(0,25) + "</small></p><p class=\"card-text\"><small>Taille: "+(f.size/1024/1024).toFixed(2)+" Mb</smaill></p>"
			    + "<textarea rows='4' class=\"form-control\" placeholder=\"Description\" name='descr-" + f.name.split(".").join("_")
			    +"'></textarea></div></div></div>";
		    selDiv.append(html);

		}
		reader.readAsDataURL(f);
	    });
}

