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
	var contenu_questionnaire;
	var contenu_fichier;
	var contenu_connectes;
	var monQuestionnaire = [];
	var listeConnectes = [];
	var maPartie = [];
	var i;
	var n;
	var rep;
	var bonRep;
	var tour;
	var joueur;
	var tourJoueur;

	// ON VERIFIE SI LE JOUEUR A ENTRER LA BONNE REPONSE

	contenu_questionnaire = fs.readFileSync("questionnaire.json", 'UTF-8');
	monQuestionnaire = JSON.parse(contenu_questionnaire);

	contenu_connectes = fs.readFileSync("connectes.json", 'UTF-8');
	listeConnectes = JSON.parse(contenu_connectes);

	joueur = false;
	i =0;
	while(i<listeConnectes.length && joueur === false) {
		if(listeConnectes[i].pseudo === query.pseudo) {
			contenu_fichier = fs.readFileSync("partie"+listeConnectes[i].NP+".json", 'UTF-8');
			maPartie = JSON.parse(contenu_fichier);
			joueur = true;
		} else {
			i++;
		}
	}

	tour = Number(maPartie[0].tour);

	if(tour % 2  === 0) {
		tourJoueur = maPartie[1].J1
	} else {
		tourJoueur = maPartie[1].J2
	}

	n = tourJoueur.question[0];
	rep = Number(query.reponse);
	bonRep = Number(monQuestionnaire[n].br);

	if(rep === bonRep) {

		tourJoueur.points =  Number(tourJoueur.points) + 1;

		contenu_fichier = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+listeConnectes[i].NP+".json", contenu_fichier, 'UTF-8');

		if(tourJoueur.points > 4) {

			page = fs.readFileSync('gagne.html', 'UTF-8');
			marqueurs = {};
			marqueurs.pseudo = query.pseudo
			page = page.supplant(marqueurs);

			} else {

				marqueurs = {};
				marqueurs.pseudo = query.pseudo;
				marqueurs.j1 = query.pseudo;
				marqueurs.j2 = listeConnectes[i].adv;
				marqueurs.score1 = maPartie[1].J1.points;
				marqueurs.score2 = maPartie[1].J2.points;
				page = fs.readFileSync('joueur_passif.html', 'UTF-8');
				page = page.supplant(marqueurs);

			}

		} else {


			page = fs.readFileSync('joueur_passif.html', 'UTF-8');
			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			marqueurs.j1 = query.pseudo;
			marqueurs.j2 = listeConnectes[i].adv;
			marqueurs.score1 = maPartie[1].J1.points;
			marqueurs.score2 = maPartie[1].J2.points;
			page = page.supplant(marqueurs);

		}
	
		maPartie[0].tour = Number(maPartie[0].tour) +1;
		tourJoueur.question.splice(0, 1);

		contenu_fichier = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+listeConnectes[i].NP+".json", contenu_fichier, 'UTF-8');


res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};

//=============================================================================

module.exports = trait;


