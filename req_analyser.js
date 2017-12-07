//====================================================================
// Traitement de "req_analyser"
// Auteur : Achraf, Djibril, Ismael
// Version : 27/11/2017
//====================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var membre;
	var contenu_questionnaire;
	var contenu_fichier;
	var monQuestionnaire = [];
	var maPartie = [];
	var i;
	var n;

	// ON VERIFIE SI LE JOUEUR A ENTRER LA BONNE REPONSE

	contenu_questionnaire = fs.readFileSync("questionnaire.json", 'UTF-8');
	monQuestionnaire = JSON.parse(contenu_questionnaire);

	contenu_fichier = fs.readFileSync("partie"+query.pseudo+".json", 'UTF-8');
	maPartie = JSON.parse(contenu_fichier);

	n = maPartie.question;

	if(query.reponse === monQuestionnaire[n].br) {

		nouvellePartie = {};
	nouvellePartie.question = n;
	nouvellePartie.points = maPartie.points + 1;

	maPartie.push(nouvellePartie);

	contenu_fichier = JSON.stringify(maPartie);
	fs.writeFileSync("partie"+query.pseudo+".json", maPartie, 'UTF-8');

	page = readFileSync('joueur_passif.html', 'UTF-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

} else {

	page = readFileSync('joueur_passif.html', 'UTF-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

}

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};

//=============================================================================

module.exports = trait;


