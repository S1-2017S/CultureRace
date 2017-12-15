//====================================================================
// Traitement de "req_attendre"
// Auteur : Achraf, Djibril, Ismael
// Version : 27/11/2017
//====================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page
	var membre;
	var contenu_fichier;
	var listeConnectes = [];
	var salleAttente = [];
	var i;
	var trouve;
	var n;
	var contenu_SA;
	var nouveau;
	var nouveauJ1;
	var nouveauJ2;
	var nouvellePartieJoueur1;
	var nouvellePartieJoueur2;
	var maPartie = [];
	var contenu_partie;
	var joueur;
	var Joueur;
	var Players;
	var J2;

	// ON LIT LES JOUEURS CONNECTES

	contenu_fichier = fs.readFileSync("connectes.json", 'UTF-8');
	listeConnectes = JSON.parse(contenu_fichier);

	nouveau = {};
	nouveau.pseudo = query.pseudo;
	nouveau.etat = "ATTENTE";

	// ON VERIFIE SI QUELQU'UN EST DEJA CONNECTE 

	Joueur = false;
	i=0;
	while(i<listeConnectes.length && Joueur === false) {
		if(listeConnectes[i].etat === "ATTENTE") {
			J2 = listeConnectes[i].pseudo;
			Joueur = true;
		}
		i++;
	}


	if(Joueur === false) {

	for(i=0; i<listeConnectes.length; i++) {
		if(listeConnectes[i].pseudo === query.pseudo) {
			listeConnectes[i] = nouveau;
		}
	}

		contenu_fichier = JSON.stringify(listeConnectes);
		fs.writeFileSync("connectes.json", contenu_fichier, 'UTF-8');

		// ON RENVOIT UNE PAGE HTML 
		// LE JOUEUR EST REDIRIGE VERS LA SALLE D'ATTENTE

		page = fs.readFileSync('salle_attente.html', 'UTF-8');

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

		joueur = {};
		joueur.tour = 0;
		maPartie.push(joueur);

		nouvellePartieJoueur1 = {};
		nouvellePartieJoueur1.J1question = "";
		nouvellePartieJoueur1.J1points = 0;

		maPartie.push(nouvellePartieJoueur1);

		nouvellePartieJoueur2 = {};
		nouvellePartieJoueur2.J2question = "";
		nouvellePartieJoueur2.J2points = 0;

		maPartie.push(nouvellePartieJoueur2);


		contenu_partie = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+query.pseudo+".json", contenu_partie, 'UTF-8');



		// SI QUELQU'UN EST DEJA EN SALLE D'ATTENTE, ALORS LE JOUEUR EST REDIRIGE VERS LA PAGE JOUEUR PASSIF

	} else {

		contenu_partie = fs.readFileSync("partie"+J2+".json", 'UTF-8');
		maPartie = JSON.parse(contenu_partie);

		contenu_partie = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+J2+".json", contenu_partie, 'UTF-8');

		nouveauJ1 = {}
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

		// ON RENVOIT UNE PAGE HTML 
		// LE JOUEUR EST REDIRIGE VERS LA SALLE D'ATTENTE

		page = fs.readFileSync('joueur_passif.html', 'UTF-8');

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page)
		res.end();
};

//-------------------------------------------------------------------------

module.exports = trait;
