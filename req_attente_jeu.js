//==============================================================================
// Traitement de "req_attente_jeu"
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
	var contenu_fichier;
	var contenu_partie;
	var monQuestionnaire = [];
	var salleAttente = [];
	var maPartie = [];
	var questionnaire;
	var nouvellePartie;
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

		contenu_partie = fs.readFileSync('partie'+query.pseudo+'.json', 'UTF-8');
		maPartie = JSON.parse(contenu_partie);

		nouvellePartie = {};
		nouvellePartie.J1question = n;
		nouvellePartie.J1points = 0;

		maPartie[1] = nouvellePartie;

		contenu_partie = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+query.pseudo+".json", contenu_partie, 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo
		page = page.supplant(marqueurs);

	} else {

		page = fs.readFileSync('salle_attente.html', 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo
		page = page.supplant(marqueurs);


	}


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//=============================================================================

module.exports = trait;

