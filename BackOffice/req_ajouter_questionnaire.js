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
	var j;
	var k;
	var radios;
	var bloc;
	var questionnaire;
	var reponse = [];

	questionnaire = [];
	//console.log(query);
	for(i = 0; i < query.number; i++){
		bloc = {};
		bloc.question = query["questions" + String(i)];
		for(j = 0; j < 4; j++){
			reponse[j] = query["reponse" + String(j)];
			bloc.reponse = reponse;
			if(query["reponse" + String(j)] = "on"){
				br[j] = j;
			}
			questionnaire.push(bloc);
		}
	}
	questionnaire = JSON.stringify(questionnaire);
	fs.writeFileSync("test.json", questionnaire, "UTF-8");

	page = fs.readFileSync('questionnaire_ajoute.html','UTF-8');
	marqueurs = {};
	marqueurs.nvQ = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();
};

//-------------------------------------------------------------------

module.exports = trait;
