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
	var nouvellePartieJoueur1;
	var nouvellePartieJoueur2;
	var i;
	var n;
	var ns;
	var rep;
	var bonRep;
	var tour;

	// ON VERIFIE SI LE JOUEUR A ENTRER LA BONNE REPONSE

	contenu_questionnaire = fs.readFileSync("questionnaire.json", 'UTF-8');
	monQuestionnaire = JSON.parse(contenu_questionnaire);

	contenu_fichier = fs.readFileSync("partie"+query.pseudo+".json", 'UTF-8');
	maPartie = JSON.parse(contenu_fichier);
	
	tour = Number(maPartie[0].tour);

	if(tour === 0) {

		n = maPartie[1].J1question;

		rep = Number(query.reponse);
		bonRep = Number(monQuestionnaire[n].br);

		if(rep === bonRep) {

			nouvellePartieJoueur1 = {};
			nouvellePartieJoueur1.J1question = n;
			nouvellePartieJoueur1.J1points = Number(maPartie[1].J1points) + 1;

			maPartie[1] = nouvellePartieJoueur1;
			maPartie[0].tour = 1

			contenu_fichier = JSON.stringify(maPartie);
			fs.writeFileSync("partie"+query.pseudo+".json", contenu_fichier, 'UTF-8');

			page = fs.readFileSync('joueur_passif.html', 'UTF-8');

			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

			} else {

			maPartie[0].tour = 1

			contenu_fichier = JSON.stringify(maPartie);
			fs.writeFileSync("partie"+query.pseudo+".json", contenu_fichier, 'UTF-8');

			page = fs.readFileSync('joueur_passif.html', 'UTF-8');

			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

			}

		} else {

		n = maPartie[2].J2question;

		rep = Number(query.reponse);
		bonRep = Number(monQuestionnaire[n].br);

		if(rep === bonRep) {

			nouvellePartieJoueur2 = {};
			nouvellePartieJoueur2.J2question = n;
			nouvellePartieJoueur2.J2points = Number(maPartie[2].J2points) + 1;

			maPartie[2] = nouvellePartieJoueur2;
			maPartie[0].tour = 0;

			contenu_fichier = JSON.stringify(maPartie);
			fs.writeFileSync("partie"+query.pseudo+".json", contenu_fichier, 'UTF-8');

			page = fs.readFileSync('joueur_passif.html', 'UTF-8');

			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

			} else {

			maPartie[0].tour = 0;

			contenu_fichier = JSON.stringify(maPartie);
			fs.writeFileSync("partie"+query.pseudo+".json", contenu_fichier, 'UTF-8');

			page = fs.readFileSync('joueur_passif.html', 'UTF-8');

			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

			}
		
		}

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};

//=============================================================================

module.exports = trait;


