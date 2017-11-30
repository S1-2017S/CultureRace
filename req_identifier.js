//=========================================================================
// Traitement de "req_identifier"
// Auteur : Achraf, Djibril, Ismael
// Version : 20/11/2017
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var compte;
	var mdp;
	var page;
	var membre;
	var contenu_fichier;
	var contenu_co;
	var listeMembres = [];
	var i;
	var trouve;
	var listeConnectes = [];
	var nouveauConnectes;
	var pseudo;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'UTF-8');    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			if(listeMembres[i].password === query.password) {
				trouve = true;
			}
		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 

	if(trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

		page = fs.readFileSync('accueil.html', 'UTF-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else {
		// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

		contenu_co = fs.readFileSync("connectes.json", 'UTF-8');    
		listeConnectes = JSON.parse(contenu_co);

		trouve = false;
		for(i=0; i<listeConnectes.length && trouve === false; i++) {
			if(listeConnectes[i].pseudo === query.pseudo) {
					trouve = true;
			}
		}

		if(trouve === false) {

		page = fs.readFileSync('accueil_membre.html', 'UTF-8');
		nouveauConnectes = {};
		nouveauConnectes.pseudo = query.pseudo;
		nouveauConnectes.etat = "LIBRE";
		listeConnectes.push(nouveauConnectes);
		
		contenu_co = JSON.stringify(listeConnectes);
		fs.writeFileSync("connectes.json", contenu_co, 'UTF-8');

		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

		} else {

		page = fs.readFileSync('accueil_membre.html', 'UTF-8');
		marqueurs  = {};
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	}

	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;

