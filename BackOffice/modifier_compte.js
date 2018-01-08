//modifier_compte.js

//=================================================================
// Traitement de "req_modifier_compte"
// Auteur : Achraf
// Version : 6/12/2017
//================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var listePseudo;
	var membre;
	var newPwd;
	var i;

	// AFFICHER PAGE AVEC PASSWORD MODIFIE

	listePseudo = fs.readFileSync('membres.json', 'utf-8');
	membre = JSON.parse(listePseudo);


	for(i=0; i<membre.length; i++){

		membre[i].password = query.password;
		listePseudo = JSON.stringify(membres);
		fs.writeFileSync('membres.json', newPwd, 'UTF-8');		
	}
	marqueurs = {};
	marqueurs.password = newPwd;
	marqueurs.modifié = "Le mot de passe a bien été modifié";
	page = page.supplant(marqueurs);

	page = fs.readFileSync('menu_compte.html', 'utf-8');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};
//---------------------------------------------------------------

module.exports = trait;
