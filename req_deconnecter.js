//===========================================================================
// Traitement de req_deconnecter
// Auteur : Achraf, Djibril, ISmael
// Version du 28/11/2017
//==========================================================================

"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
   
    var listeConnectes = [];
    var membreConnectes;
    var contenu_fichier;
    var page;
	var i;
	var marqueurs;

    // ON AFFICHE L'ACCUEIL	
	
	page = fs.readFileSync('accueil.html', 'UTF-8');

	contenu_fichier = fs.readFileSync('connectes.json', 'UTF-8');
	listeConnectes = JSON.parse(contenu_fichier);
    
	for(i=0; i<listeConnectes.length; i++) {
		if(query.pseudo === listeConnectes[i].pseudo) {
		listeConnectes.splice(listeConnectes[i]);
		}
	}
	console.log(query.pseudo);
	console.log(listeConnectes[0]);

	contenu_fichier = JSON.stringify(listeConnectes);
	fs.writeFileSync("connectes.json", contenu_fichier, 'UTF-8');


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//==========================================================================

module.exports = trait;
