//req_afficher_page_ajout

//==================================================================
// Traitement de "req_afficher_page_ajout"
// Auteur: Achraf
// Version : 08/01/2018
//==================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;

	// AFFICHAGE DE LA PAGE AJOUT DE QUESTIONNAIRE

	page = fs.readFileSync('option_nouveau_questionnaire.html','UTF-8');

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};

//--------------------------------------------------------------------

module.exports = trait;
