//afficher_menu_compte.js

//=====================================================================
// Traitement de "req_afficher_menu_compte"
// Auteur: Achraf
// Version 19/12/2017
//=====================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;

	// AFFICHAGE DE LA PAGE DE GESTION DE COMPTES

	page = fs.readFileSync('menu_compte.html','UTF-8');

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};

//--------------------------------------------------------------------

module.exports = trait;
