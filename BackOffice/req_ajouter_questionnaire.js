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
	var bloc;
	var questionnaire;
	var reponse = [];

	questionnaire = [];
	for(i = 0; i < query.number; i++){
		bloc = {};
		bloc.question = query["questions" + String(i)];
		for(j = 0; j < 4; j++){
			reponse[j] = query["reponse" + String(j)];
			bloc.reponse = reponse;
			if(query["Q" + i + "_bon"] === "0"){
				bloc.br = 0;
			}else if(query["Q" + i + "_bon"] === "1"){
				bloc.br = 1;
			}else if(query["Q" + i + "_bon"] === "2"){
				bloc.br = 2;
			}else if(query["Q" + i + "_bon"] === "3"){
				bloc.br = 3;
			}
		}
		questionnaire.push(bloc);
	}
	questionnaire = JSON.stringify(questionnaire);
	fs.writeFileSync(query.nomQ + ".json", questionnaire, "UTF-8");

	page = fs.readFileSync('questionnaire_ajoute.html','UTF-8');
	marqueurs = {};
	marqueurs.nvQ = query.nomQ;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();
};

//-------------------------------------------------------------------

module.exports = trait;
