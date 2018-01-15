//modifier_compte.js

//===================================================================
// Traitement de "req_modifier_questionnaire"
// Auteur: Achraf
// Version : 15/01/2018
//===================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var questionnaire;
	var nvQ;
	var i;

	// ON RENVOIT LA PAGE AVEC LE QUESTIONNAIRE ACTUALISE	
	
	questionnaire = fs.writeFileSync(query.questionnaire, 'UTF-8');
	nvQ = JSON.parse(questionnaire);

	for(i=0; i<nvQ.length; i++){
		
	}

	marqueurs = {};
	marqueurs.modifie = "Le questionnaire a bien été modifié";
	page = page.supplant(marqueurs);

	page = fs.readFileSync("affichage_questionnaire.html","UTF-8");
	res.writeHead(200, {'Content-Type':'text-html'});
	res.write(page);
	res.end();

};
//-------------------------------------------------------------------

module.exports = trait;
