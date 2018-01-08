//afficher_menu_questionnaire.js

//=====================================================================
// Traitement de "req_afficher_menu_questionnaire"
// Auteur: Achraf
// Version 05/01/2018
//=====================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;

	// AFFICHAGE DE LA PAGE DE GESTION DE COMPTES

	page = fs.readFileSync('menu_questionnaire.html','UTF-8');

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};

//--------------------------------------------------------------------

module.exports = trait;
