//===========================================================================
// Traitement de la req_attente_jouer
// Auteur : Achraf, Djibril, Ismael
// Version : 08/12/2017
//===========================================================================

"use strict"

var fs = require('fs');
require ('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var membre;
	var contenu_questionnaire;
	var contenu_partie;
	var monQuestionnaire = [];
	var questionnaire;
	var maPartie = [];
	var i;
	var n;

	// ON REDIRIGE EN JOUEUR ACTIF

		contenu_questionnaire = fs.readFileSync("questionnaire.json", 'UTF-8');
		monQuestionnaire = JSON.parse(contenu_questionnaire);

		contenu_partie = fs.readFileSync("partieisma.json", 'UTF-8');
		maPartie = JSON.parse(contenu_partie);

	if(maPartie[0].tour === 0) {

	//	n = Math.floor(Math.random() * (monQuestionnaire.length)-1);

	//	questionnaire = {};
	//	questionnaire.question = monQuestionnaire[n].question
	//	questionnaire.reponses1 = monQuestionnaire[n].reponses[0];
	//	questionnaire.reponses2 = monQuestionnaire[n].reponses[1];
	//	questionnaire.reponses3 = monQuestionnaire[n].reponses[2];
	//	questionnaire.reponses4 = monQuestionnaire[n].reponses[3];

	//	maPartie[1].J1question = n;

	//	contenu_partie = JSON.stringify(maPartie);
	//	fs.writeFileSync("partie"+query.pseudo+".json", contenu_partie, 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;


		page = fs.readFileSync('joueur_passif.html', 'UTF-8');

		page = page.supplant(marqueurs);

	}else{

        n = Math.floor(Math.random() * (monQuestionnaire.length)-1);

		questionnaire = {};
		questionnaire.question = monQuestionnaire[n].question
		questionnaire.reponses1 = monQuestionnaire[n].reponses[0];
		questionnaire.reponses2 = monQuestionnaire[n].reponses[1];
	    questionnaire.reponses3 = monQuestionnaire[n].reponses[2];
		questionnaire.reponses4 = monQuestionnaire[n].reponses[3];

		maPartie[2].J2question = n;

		contenu_partie = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+maPartie[2].adv+".json", contenu_partie, 'UTF-8');

        marqueurs = {};
		marqueurs.pseudo = query.pseudo;

		page = fs.readFileSync('joueur_actif.html', 'UTF-8');

		page = page.supplant(marqueurs);
		page = page.supplant(questionnaire);

}
        res.writeHead(200, {'Content-type': 'text/html'});
		res.write(page);
		res.end();

//============================================================================
}
module.exports = trait;
