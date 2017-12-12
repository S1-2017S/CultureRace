//annuler.js

//================================================================
// Traitement de "req_annuler"
// Auteur: Achraf
// Version : 07/12/2017
//================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	//ON RETOURNE VERS LA PAGE MENU_COMPTE

	page = fs.readFileSync('menu_compte.html','UTF-8');
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.password = membre[i].password;
	marqueurs.modifie = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, ({'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//---------------------------------------------------------------

module.exports = trait;
