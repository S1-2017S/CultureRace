//lister_compter.js

//======================================================================
// Traitement de "req_lister_compte"
// Auteur: Achraf
// Version : 11/12/2017
//======================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var listePseudo;
	var membre = {};
	var i;
	var affichage;

	//AFFICHAGE DE LA LISTE DES MEMBRES

	listePseudo = fs.readFileSync('../membres.json','utf-8');
	membre = JSON.parse(listePseudo);

	//ON AFFICHE LES MEMBRES UN PAR UN SOUS FORME DE TABLEAU

	affichage = "";
	for(i=0;i<membre.length;i++){
	affichage = affichage + "<tr><td>" + membre[i].pseudo + "</td><td>" + membre[i].password + "</td></tr>";
	}
	
	page = fs.readFileSync('liste_compte.html','UTF-8');
	marqueurs = {};
	marqueurs.liste = affichage;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();
	};

//--------------------------------------------------------------------

module.exports = trait;
