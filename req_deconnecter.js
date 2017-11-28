//===========================================================================
// Traitement de req_deconnecter
// Auteur : Achraf, Djibril, ISmael
// Version du 28/11/2017
//==========================================================================

"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
   

    // ON AFFICHE L'ACCUEIL	

	page = fs.readFileSync('accueil.html', 'UTF-8');
    
	contenu_fichier = fs.readFileSync('connectes.json', 'UTF-8');
	listeConnectes = JSON.parse(contenu_fichier);

	nouveauConnectes = {};
	nouveauConnectes.etat = "DECONNECTE"
	listeConnectes.push(nouveau.Connectes);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//==========================================================================

module.exports = traits;
