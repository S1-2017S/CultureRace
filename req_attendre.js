//====================================================================
// Traitement de "req_attendre"
// Auteur : Achraf, Djibril, Ismael
// Version : 11/01/2017
//====================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_fichier;
	var listeConnectes = [];
	var i;
	var nouveau;
	var nouveauJ1;
	var nouveauJ2;
	var maPartie = [];
	var contenu_partie;
	var joueur;
	var Joueur;
	var J2;
	var liste1 = [];
	var liste2 = [];
	var J1 = {};
	var J2 = {};
	var a;
	var contenu;
	var questionnaire;
	var objet;

	// ON LIT LES JOUEURS CONNECTES

	contenu_fichier = fs.readFileSync("connectes.json", 'UTF-8');
	listeConnectes = JSON.parse(contenu_fichier);


	// ON VERIFIE SI QUELQU'UN EST DEJA EN SALLE D'ATTENTE 

	Joueur = false;
	i=0;
	while(i<listeConnectes.length && Joueur === false) {
		if(listeConnectes[i].etat === "ATTENTE") {
			J2 = listeConnectes[i].pseudo;
			Joueur = true;
		}else {
		i++;
		}
	}

	// SI IL N'Y A PERSONNE EN SALLE D'ATTENTE
	if(Joueur === false) {

	// ON MODIFIE L'ETAT DE LA PERSONNE PUIS ON REECRIT DANS LE JSON
		nouveau = {};
		nouveau.pseudo = query.pseudo;
		nouveau.etat = "ATTENTE";

		for(i=0; i<listeConnectes.length; i++) {
			if(listeConnectes[i].pseudo === query.pseudo) {
				listeConnectes[i] = nouveau;
			}
		}

		contenu_fichier = JSON.stringify(listeConnectes);
		fs.writeFileSync("connectes.json", contenu_fichier, 'UTF-8');

		// LE JOUEUR EST REDIRIGE VERS LA PAGE SALLE D'ATTENTE

		page = fs.readFileSync('salle_attente.html', 'UTF-8');

		// ON CREE LE JSON DE LA PARTIE;

		contenu = fs.readFileSync("questionnaire.json", "utf-8");
		questionnaire = JSON.parse(contenu);

		a = 0;
		for(i=0; i<questionnaire.length; i++) {
			liste1[i] = a;
			a++;
		}
		for(i=0; i<questionnaire.length; i++) {
			a = Math.floor(Math.random() * liste1.length);
			liste2[i] = liste1[a];
			liste1.splice(a, 1);
		}

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

		objet = {};
		objet.tour = 0;
		maPartie.push(objet);

		joueur = {J1:{points:0,question:liste2},J2:{points:0,question:liste2}};
		maPartie.push(joueur);

		contenu_partie = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+query.pseudo+".json", contenu_partie, 'UTF-8');

	// SI QUELQU'UN EST DEJA EN SALLE D'ATTENTE, LE JOUEUR EST REDIRIGE EN PAGE PASSIF

	} else {


		contenu_partie = fs.readFileSync("partie"+J2+".json", 'UTF-8');
		maPartie = JSON.parse(contenu_partie);

	// ON LIT, MODIFIE ET ON REECRIT LE JSON DES JOUEURS CONNECTES

		nouveauJ1= {}
		nouveauJ1.pseudo = query.pseudo;
		nouveauJ1.etat = "JEU";
		nouveauJ1.adv = J2;
		nouveauJ1.NP = J2;

		for(i=0; i<listeConnectes.length; i++) {
			if(listeConnectes[i].pseudo === query.pseudo) {
				listeConnectes[i] = nouveauJ1;
			}
		}

		nouveauJ2 = {}
		nouveauJ2.pseudo = J2;
		nouveauJ2.etat = "JEU";
		nouveauJ2.adv = query.pseudo;
		nouveauJ2.NP = J2;

		for(i=0; i<listeConnectes.length; i++) {
			if(listeConnectes[i].pseudo === J2) {
				listeConnectes[i] = nouveauJ2;
			}
		}
		contenu_fichier = JSON.stringify(listeConnectes);
		fs.writeFileSync("connectes.json", contenu_fichier, 'UTF-8');

		// LE JOUEUR EST REDIRIGE VERS LA PAGE JEU PASSIF 

		page = fs.readFileSync('joueur_passif.html', 'UTF-8');

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.j2 = query.pseudo;
		marqueurs.q = ""
		marqueurs.j1 = J2;
		marqueurs.score1 = maPartie[1].J1.points;
		marqueurs.score2 = maPartie[1].J2.points;
		page = page.supplant(marqueurs);

	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page)
	res.end();
};

//-------------------------------------------------------------------------

module.exports = trait;
