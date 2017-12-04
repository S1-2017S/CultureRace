//==============================================================================
// Traitement de "req_jouer"
// Auteur : Achraf, Djibril, Ismael
// Version : 27/11/2017
//================================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
	var page;
	var contenu_fichier;
	var contenu_SA;
	var monQuestionnaire = [];
	var salleAttente = [];
	var questionnaire;
	var n;
	var i;

	contenu_SA = fs.readFileSync("salleAttente.json", 'UTF-8');
	salleAttente = JSON.parse(contenu_SA);

	if(salleAttente.length === 0) {
		contenu_fichier = fs.readFileSync("questionnaire.json", 'UTF-8');
		monQuestionnaire = JSON.parse(contenu_fichier);


		n = Math.floor(Math.random() *(monQuestionnaire.length)-1);
		i = 0;

		questionnaire  = {};
		questionnaire.question = monQuestionnaire[n].question
		questionnaire.reponses1 = monQuestionnaire[n].reponses[0];
		questionnaire.reponses2 = monQuestionnaire[n].reponses[1];
		questionnaire.reponses3 = monQuestionnaire[n].reponses[2];
		questionnaire.reponses4 = monQuestionnaire[n].reponses[3];


		page = fs.readFileSync('joueur_actif.html', 'UTF-8');

		page = page.supplant(questionnaire);
	} else {

	page = fs.readFileSync('salle_attente.html', 'UTF-8');

	}

	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
	res.end();
};

//=============================================================================

module.exports = trait;

