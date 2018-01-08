//choix_pseudo_modifier

//=========================================================================
// Traitement de "req_choix_pseudo_modifier"
// Auteur: Achraf
// Version : 5/01/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var page;
	var marqueurs;

	// AFFICHAGE DE LA PAGE CHOIX DU PSEUDO A MODIFIER

	page = fs.readFileSync('choix_pseudo_modifier.html','UTF-8');

	marqueurs = {};
	marqueurs.erreur = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};

//-----------------------------------------------------------------------

module.exports = trait;
