//==============================================================================
// Traitement de "req_attente_debuter"
// Auteur : Achraf, Djibril, Ismael
// Version : 27/11/2017
//================================================================================

"use strict";

var fs = require('fs');
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_fichier;
	var contenu_SA;
	var contenu_fichier;
	var contenu_partie;
	var monQuestionnaire = [];
	var listeConnectes = [];
	var maPartie = [];
	var questionnaire;
	var nouvellePartie;
	var n;
	var i;
	var Joueur;

	contenu_fichier = fs.readFileSync("connectes.json", 'UTF-8');
	listeConnectes = JSON.parse(contenu_fichier);

	Joueur = false;
	i=0;
	while(i<listeConnectes.length && Joueur === false) {
		if(listeConnectes[i].etat === "ATTENTE") {
			Joueur = true;
		} else {
		i++;
	}
	}

	if(Joueur === true) {

	page = fs.readFileSync('salle_attente.html', 'UTF-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo
	page = page.supplant(marqueurs);


} else {

	contenu_fichier = fs.readFileSync("questionnaire.json", 'UTF-8');
	monQuestionnaire = JSON.parse(contenu_fichier);

	contenu_partie = fs.readFileSync("partie"+query.pseudo+".json", 'UTF-8');
	maPartie = JSON.parse(contenu_partie);


	questionnaire  = {};
	questionnaire.question = monQuestionnaire[maPartie[1].J1.question[0]].question;
	questionnaire.reponses1 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[0];
	questionnaire.reponses2 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[1];
	questionnaire.reponses3 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[2];
	questionnaire.reponses4 = monQuestionnaire[maPartie[1].J1.question[0]].reponses[3];


	page = fs.readFileSync('joueur_actif.html', 'UTF-8');

	page = page.supplant(questionnaire);

	contenu_partie = JSON.stringify(maPartie);
	fs.writeFileSync("partie"+query.pseudo+".json", contenu_partie, 'UTF-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.j1 = query.pseudo;

	for(i=0; i<listeConnectes.length; i++) {
		if(query.pseudo === listeConnectes[i].pseudo) {
			marqueurs.j2 = listeConnectes[i].adv
		}
	}
	marqueurs.score1 = maPartie[1].J1.points;
	marqueurs.score2 = maPartie[1].J2.points;
	page = page.supplant(marqueurs);


}


res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};

//=============================================================================

module.exports = trait;

