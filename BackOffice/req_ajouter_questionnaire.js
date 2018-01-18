// ajouter_questionnaire
//===================================================================
// Traitement de "req_ajouter_questionnaire"
// Auteur: Achraf
// Version : 18/01/2017
//===================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;
	var i;
	var questions;
	var reponses;
	var radios;
	
	questions = {};
	for(i=0; i<query.number;i++){
		questions[0].questions[i] = query.questions
		for(j=0; j<3; j++){
			reponse
	}

	page = fs.readFileSync('questionnaire_ajoute.html','UTF-8');
	marqueurs = {};
	marqueurs.nvQ = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();1
};

//-------------------------------------------------------------------

module.exports = trait;
