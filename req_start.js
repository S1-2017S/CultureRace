//start.js

//=========================================================================
// Traitement de "req_commencer"
// Auteur : 
// Version : 
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('accueil_admin.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
