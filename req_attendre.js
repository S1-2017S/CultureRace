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
	var contenu_fichier;
	var n;
	var contenu_SA;

	// ON LIT LES JOUEURS CONNECTES ET LA SALLE D'ATTENTE

	contenu_fichier = fs.readFileSync("connectes.json", 'utf-8');
	listeConnectes = JSON.parse(contenu_fichier);

	contenu_SA = fs.readFileSync("salleAttente.json", 'utf-8');
	salleAttente = JSON.parse(contenu_SA);

	// ON VERIFIE SI QUELQU'UN EST DEJA CONNECTE 
	
	trouve = true;
	if(salleAttente.length === 0) {
		salleAttente.push(listeConnectes[listeConnectes.length]);
		listeConnectes[listeConnectes.length] = "ATTENTE";
	

	// ON RENVOIT UNE PAGE HTML 
		// LE JOUEUR EST REDIRIGE VERS LA SALLE D'ATTENTE

		page = fs.readFileSync('salle_attente.html');
		

		contenu_SA = JSON.stringify(salleAttente);
		fs.writeFileSync("salleAttente.json", contenu_SA, 'UTF-8');

		// SI QUELQU'UN EST DEJA EN SALLE D'ATTENTE, ALORS LE JOUEUE EST REDIRIGE VERS LA PAGE JOUEUR PASSIF
	} else {
		
		listeConnectes[listeConnectes.length] = "ATTENTE";


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
