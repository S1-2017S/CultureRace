//====================================================================
// Traitement de "req_attendre"
// Auteur : Achraf, Djibril, Ismael
// Version : 27/11/2017
//====================================================================

"use strict"

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page
	var membre;
	var contenu_fichier;
	var listeConnectes;
	var i;
	var trouve;

	// ON LIT LES JOUEURS CONNECTES

	contenu_fichier = fs.readFileSync("connectes.json", 'utf-8');
	listeConnectes = JSON.parse(contenu_fichier);

	// ON VERIFIE SI QUELQU'UN EST DEJA CONNECTE 
	
	trouve = true;
	if(listeConnectes.length === 1) {
		trouve = false;
	}

	// ON RENVOIT UNE PAGE HTML 
		// SI PERSONNE DANS DE CONNECTE, ALORS LE JOUEUR EST REDIRIGE VERS LA SALLE D'ATTENTE
		
		if(trouve === false) {
		page = fs.readFileSync('salle_attente.html');
		
		marqueurs = {};
		marqueurs.erreur = "";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else {
		// SI QUELQU'UN EST DEJA EN SALLE D'ATTENTE, ALORS LE JOUEUE EST REDIRIGE VERS LA PAGE JOUEUR PASSIF

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
