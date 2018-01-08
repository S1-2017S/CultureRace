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
	var listePseudo;
	var membre = {};
	var i;

	// AFFICHER PAGE CONFIRMATION SUPPRESSION

	listePseudo = fs.readFileSync('../membres.json','UTF-8');
	membre = JSON.parse(listePseudo);

	//SI LE COMPTE EXISTE BIEN

	for(i=0;i<membre.length;i++){
		if(query.pseudo === membre[i].pseudo){
			page = fs.readFileSync('confirmation_suppression.html','UTF-8');
			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

			break;
		}

		//SI LE COMPTE N'EXISTE PAS

		else{

			page = fs.readFileSync('choix_pseudo_supprimer.html','UTF-8');
			marqueurs = {};
			marqueurs.erreur = "Ce pseudo n'existe pas!";
			page = page.supplant(marqueurs);
		}
	}
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------

module.exports = trait;
