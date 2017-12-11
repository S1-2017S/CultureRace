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
	var nouveauSalleAttente;
	var nouvellePartieJoueur1;
	var nouvellePartieJoueur2;
	var maPartie = [];
	var contenu_partie;
	var tourJoueur;

	// ON LIT LES JOUEURS CONNECTES ET LA SALLE D'ATTENTE

	contenu_fichier = fs.readFileSync("connectes.json", 'UTF-8');
	listeConnectes = JSON.parse(contenu_fichier);

	contenu_SA = fs.readFileSync("salleAttente.json", 'UTF-8');
	salleAttente = JSON.parse(contenu_SA);

	nouveauSalleAttente = {};
	nouveauSalleAttente.pseudo = query.pseudo;
	nouveauSalleAttente.etat = "ATTENTE";

	// ON VERIFIE SI QUELQU'UN EST DEJA CONNECTE 

	if(salleAttente.length === 0) {
		salleAttente.push(nouveauSalleAttente);


		// ON RENVOIT UNE PAGE HTML 
		// LE JOUEUR EST REDIRIGE VERS LA SALLE D'ATTENTE

		page = fs.readFileSync('salle_attente.html', 'UTF-8');

		contenu_SA = JSON.stringify(salleAttente);
		fs.writeFileSync("salleAttente.json", contenu_SA, 'UTF-8');

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

		//fs.writeFileSync("partie"+query.pseudo+".json", "[]", 'UTF-8');
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

		salleAttente.splice(salleAttente[i], 1);

		contenu_SA = JSON.stringify(salleAttente);
		fs.writeFileSync("salleAttente.json", contenu_SA, 'UTF-8');

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
