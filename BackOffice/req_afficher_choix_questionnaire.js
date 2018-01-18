//afficher_choix_questionnaire.js

//======================================================================
// Traitement de "req_afficher_choix_questionnaire"
// Auteur : Achraf
// Version : 10/01/2018
//======================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var page;
	var marqueurs;
	var liste;
	var html;
	var i;

	//ON LIT LES FICHIERS PRESENTS DANS LE DOSSIER "QUESTIONNAIRES"

	liste = fs.readdirSync("../Questionnaires","UTF-8");

	//ON AFFICHE LES QUESTIONNAIRES EXISTANTS AVEC LES BOUTONS "MODIFIER" 
	//ET "SUPPRIMER"
	
	html = "";
	for(i=0; i<liste.length; i++) {
		html = html + " <br>" + liste[i] + "<a href ='req_page_modifier_questionnaire?questionnaire=" + liste[i] + "'><button>Modifier</button></a>" + "&nbsp" + "<a href ='req_supprimer_questionnaire?questionnaire=" + liste[i] + "'><button>Supprimer</button></a>" + "<br>\n";
	}

	page = fs.readFileSync('choix_questionnaire.html','UTF-8');
	
	marqueurs = {};
	marqueurs.liste = html;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};

//----------------------------------------------------------------------

module.exports = trait;
