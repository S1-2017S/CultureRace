//confirmer_suppression.js

//============================================================
// Traitement de "req_confirmer_suppression"
// Auteur : Achraf
// Version : 07/12/2017
//============================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;


	// AFFICHER PAGE CONFIRMATION SUPPRESSION

	page = fs.readFileSync('confirmation_suppression.html','UTF-8');
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------

module.exports = trait;
