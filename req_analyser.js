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
	var la_question;
	var contenu_fichier;
	var contenu_connectes;
	var monQuestionnaire = [];
	var listeConnectes = [];
	var maPartie = [];
	var Maquestion = [];
	var i;
	var n;
	var rep;
	var bonRep;
	var tour;
	var joueur;
	var tourJoueur;
	var Player;
	var tourJoueur2;

	// ON RECUPERE LES DONNEES DE LA PARTIE EN COURS


	contenu_connectes = fs.readFileSync("connectes.json", 'UTF-8');
	listeConnectes = JSON.parse(contenu_connectes);

	joueur = false;
	i =0;
	while(i<listeConnectes.length && joueur === false) {
		if(listeConnectes[i].pseudo === query.pseudo) {
			contenu_fichier = fs.readFileSync("partie"+listeConnectes[i].NP+".json", 'UTF-8');
			maPartie = JSON.parse(contenu_fichier);
			la_question = fs.readFileSync("question_"+listeConnectes[i].NP+".json", 'UTF-8');
			Maquestion = JSON.parse(la_question);
			Player = listeConnectes[i].adv
			joueur = true;
		} else {
			i++;
		}
	}

	tour = Number(maPartie[0].tour);

	if(tour % 2  === 0) {
		tourJoueur = maPartie[1].J1
		tourJoueur2 = maPartie[1].J2
	} else {
		tourJoueur = maPartie[1].J2
		tourJoueur2 = maPartie[1].J1
	}

	// ON ANALYSE SI LA REPONSE DU JOUEUR EST CORRECTE

	contenu_questionnaire = fs.readFileSync("questionnaire.json", 'UTF-8');
	monQuestionnaire = JSON.parse(contenu_questionnaire);

	n = tourJoueur.question[0];
	rep = Number(query.reponse);
	bonRep = Number(monQuestionnaire[n].br);

	if(rep === bonRep) {

		// SI OUI

		tourJoueur.points =  Number(tourJoueur.points) + 1;

		contenu_fichier = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+listeConnectes[i].NP+".json", contenu_fichier, 'UTF-8');

		// ANALYSE DE LA REPONSE SI TOUR IMPAIR

		if(tour % 2 === 1) {

		// SI LE JOUEUR 1 GAGNE

			if(tourJoueur.points > 4 && tourJoueur.points > tourJoueur2.points) {

				page = fs.readFileSync('gagne.html', 'UTF-8');
				marqueurs = {};
				marqueurs.pseudo = query.pseudo
				page = page.supplant(marqueurs);

				joueur = false;
				i =0;
				while(i<listeConnectes.length && joueur === false) {
					if(listeConnectes[i].pseudo === query.pseudo) {
						listeConnectes[i].etat = "GAGNANT";
						joueur = true;
					} else {
						i++;
					}
				}
			contenu_connectes = JSON.stringify(listeConnectes);
			fs.writeFileSync("connectes.json", contenu_connectes, 'UTF-8');

			// SI LE JOUEUR 2 GAGNE

			} else if(tourJoueur2.points > 4 && tourJoueur.points < tourJoueur2.points) {

				page = fs.readFileSync('perd.html', 'UTF-8');
				marqueurs = {};
				marqueurs.pseudo = query.pseudo
				page = page.supplant(marqueurs);

				joueur = false;
				i =0;
				while(i<listeConnectes.length && joueur === false) {
					if(listeConnectes[i].pseudo === query.pseudo) {
						listeConnectes[i].etat = "PERDANT";
						joueur = true;
					} else {
						i++;
					}
				}
			contenu_connectes = JSON.stringify(listeConnectes);
			fs.writeFileSync("connectes.json", contenu_connectes, 'UTF-8');

			// EN CAS D'EGALITE - MORT SUBITE
			} else if (tourJoueur.points === tourJoueur2.points){
					
					Maquestion[0] = tourJoueur.question[0];

					marqueurs = {};
					marqueurs.pseudo = query.pseudo;
					marqueurs.q = monQuestionnaire[Maquestion[0]].question;
					marqueurs.r = monQuestionnaire[Maquestion[0]].reponses[monQuestionnaire[Maquestion[0]].br];
					marqueurs.j1 = query.pseudo;
					marqueurs.j2 = Player;
					marqueurs.score1 = maPartie[1].J1.points;
					marqueurs.score2 = maPartie[1].J2.points;
					page = fs.readFileSync('joueur_passif.html', 'UTF-8');
					page = page.supplant(marqueurs);

					la_question = JSON.stringify(Maquestion);
					fs.writeFileSync("question_"+listeConnectes[i].NP+".json",la_question , 'UTF-8');

			// SI LES JOUEURS ONT MOINS DE 5 POINTS

			}else {
					
					Maquestion[0] = tourJoueur.question[0];

					marqueurs = {};
					marqueurs.pseudo = query.pseudo;
					marqueurs.q = monQuestionnaire[Maquestion[0]].question;
					marqueurs.r = monQuestionnaire[Maquestion[0]].reponses[monQuestionnaire[Maquestion[0]].br];
					marqueurs.j1 = query.pseudo;
					marqueurs.j2 = Player;
					marqueurs.score1 = maPartie[1].J1.points;
					marqueurs.score2 = maPartie[1].J2.points;
					page = fs.readFileSync('joueur_passif.html', 'UTF-8');
					page = page.supplant(marqueurs);

					la_question = JSON.stringify(Maquestion);
					fs.writeFileSync("question_"+listeConnectes[i].NP+".json",la_question , 'UTF-8');

			}

		// SEUL LE JOUEUR 1 A JOUER

		} else {

				Maquestion[0] = tourJoueur.question[0];

				page = fs.readFileSync('joueur_passif.html', 'UTF-8');
				marqueurs = {};
				marqueurs.pseudo = query.pseudo;
				marqueurs.q = monQuestionnaire[Maquestion[0]].question;
				marqueurs.r = monQuestionnaire[Maquestion[0]].reponses[monQuestionnaire[Maquestion[0]].br];
				marqueurs.j1 = query.pseudo;
				marqueurs.j2 = Player;
				marqueurs.score1 = maPartie[1].J1.points;
				marqueurs.score2 = maPartie[1].J2.points;
				page = page.supplant(marqueurs);

				la_question = JSON.stringify(Maquestion);
				fs.writeFileSync("question_"+listeConnectes[i].NP+".json",la_question , 'UTF-8');

		}

		// EN CAS DE MAUVAISE REPONSE

	} else {

		//SI LE JOUEUR 1 A PLUS DE POINTS APRES LE MEME NOMBRE DE TOUR

		if(tourJoueur2.points > 4 && tourJoueur.points < tourJoueur2.points) {

			page = fs.readFileSync('perd.html', 'UTF-8');
			marqueurs = {};
			marqueurs.pseudo = query.pseudo
			marqueurs.q = monQuestionnaire[Maquestion[0]].question;
			page = page.supplant(marqueurs);

			joueur = false;
			i =0;
			while(i<listeConnectes.length && joueur === false) {
				if(listeConnectes[i].pseudo === query.pseudo) {
					listeConnectes[i].etat = "PERDANT";
					joueur = true;
				} else {
					i++;
				}
			}
		contenu_connectes = JSON.stringify(listeConnectes);
		fs.writeFileSync("connectes.json", contenu_connectes, 'UTF-8');

		// MEME NOMBRE DE POINTS

		} else {

				Maquestion[0] = tourJoueur.question[0];

				marqueurs = {};
				marqueurs.pseudo = query.pseudo;
				marqueurs.q = monQuestionnaire[Maquestion[0]].question;
				marqueurs.r = monQuestionnaire[Maquestion[0]].reponses[monQuestionnaire[Maquestion[0]].br];
				marqueurs.j1 = query.pseudo;
				marqueurs.j2 = Player;
				marqueurs.score1 = maPartie[1].J1.points;
				marqueurs.score2 = maPartie[1].J2.points;
				page = fs.readFileSync('joueur_passif.html', 'UTF-8');
				page = page.supplant(marqueurs);

				la_question = JSON.stringify(Maquestion);
				fs.writeFileSync("question_"+listeConnectes[i].NP+".json",la_question , 'UTF-8');

		}

	}


	// ON AJOUTE UN TOUR ET ON RETIRE LA QUESTION DE LA LISTE 	
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


