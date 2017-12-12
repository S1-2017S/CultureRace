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
	var nouvellePartieJoueur1;
	var nouvellePartieJoueur2;
	var maPartie = [];
	var contenu_partie;
	var tourJoueur;
	var Joueur;
	var Players;
	var Player1;

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
			Joueur = true;
		}
		i++;
	}
	if(Joueur === false) {
	for(i=0; i<listeConnectes.length; i++) {
		if(trouve === false && listeConnectes.pseudo === query.pseudo) {
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

		Players = {};
		Player1 = query.pseudo;
		Players2 = "";
		maPartie.push(Players);

		tourJoueur = {};
		tourJoueur.tour = 0;
		maPartie.push(tourJoueur);

		nouvellePartieJoueur1 = {};
		nouvellePartieJoueur1.J1question = "";
		nouvellePartieJoueur1.J1points = 0;

		maPartie.push(nouvellePartieJoueur1);

		nouvellePartieJoueur2 = {};
		nouvellePartieJoueur2.J2question = "";
		nouvellePartieJoueur2.J2points = 0;
		nouvellePartieJoueur2.adv = query.pseudo;

		maPartie.push(nouvellePartieJoueur2);


		contenu_partie = JSON.stringify(maPartie);
		fs.writeFileSync("partie"+query.pseudo+".json", contenu_partie, 'UTF-8');



		// SI QUELQU'UN EST DEJA EN SALLE D'ATTENTE, ALORS LE JOUEUE EST REDIRIGE VERS LA PAGE JOUEUR PASSIF
	} else {

		// ON VERIFIE SI QUELQU'UN EST DEJA CONNECTE 

		nouveau = {}
		nouveau.pseudo =query.pseudo;
		nouveau.etat = "JEU";

		Joueur = false;
		i=0;
		while(i<listeConnectes.length && Joueur === false) {
			if(listeConnectes[i].etat === "ATTENTE") {
				Joueur = true;
				listeConnectes[i].etat = "JEU"
			}
			i++;
		}

	}
	for(i=0; i<listeConnectes.length; i++) {
		if(trouve === true && listeConnectes.pseudo === query.pseudo) {
			listeConnectes[i] = nouveau;
		}

		contenu_fichier = JSON.stringify(listeConnectes);
		fs.writeFileSync("connectes.json", contenu_fichier, 'UTF-8');

		// ON RENVOIT UNE PAGE HTML 
		// LE JOUEUR EST REDIRIGE VERS LA SALLE D'ATTENTE

		page = fs.readFileSync('salle_attente.html', 'UTF-8');

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

		//contenu_fichier = fs.readFileSync("partie"+query.pseudo+".json", 'UTF-8');
		//maPartie = JSON.parse(contenu_fichier);

		//contenu_fichier = JSON.stringify(maPartie);
		//fs.writeFileSync("partie"+query+pseudo+".json", contenu_fichier, 'UTF-8');

		page = fs.readFileSync('joueur_passif.html', 'UTF-8');

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

		//nouvellePartie = {};
		//nouvellePartie.J2question = "";
		//nouvellePartie.J2points = 0;

		//maPartie.push(nouvellePartie);

		//contenu_partie = JSON.stringify(maPartie);
		//fs.writeFileSync("partie"+query.pseudo+"json", contenu_partie, 'UTF-8');

	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page)
		res.end();
};

//-------------------------------------------------------------------------

module.exports = trait;
