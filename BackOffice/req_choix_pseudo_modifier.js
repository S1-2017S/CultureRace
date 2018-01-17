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
	var listePseudo;
	var membre = {};
	var i;
	var affichage;

	// AFFICHAGE DE LA PAGE CHOIX DU PSEUDO A MODIFIER

	listePseudo = fs.readFileSync('../membres.json','UTF-8');
	membre = JSON.parse(listePseudo);
	
	affichage = "";
	for(i=0;i<membre.length;i++){
	affichage = affichage + "<tr><td>" + membre[i].pseudo + "</td></tr>";
	}

	page = fs.readFileSync('choix_pseudo_modifier.html','UTF-8');
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.liste = affichage;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};

//-----------------------------------------------------------------------

module.exports = trait;
