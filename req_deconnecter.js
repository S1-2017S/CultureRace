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

    // ON AFFICHE L'ACCUEIL	

	page = fs.readFileSync('accueil.html', 'UTF-8');
    
	contenu_fichier = fs.readFileSync('connectes.json', 'UTF-8');
	listeConnectes = JSON.parse(contenu_fichier);
    
	membreConnectes = {};
	membreConnectes.pseudo = query.pseudo;
    listeConnectes.splice(membreConnectes);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//==========================================================================

module.exports = trait;
