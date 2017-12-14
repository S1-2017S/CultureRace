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
	var page;
	var i;
	var joueur;
	var listeMembres;

	//SI PERSONNE EN SALLE ATTENTE

	listeMembres = fs.readFileSync('connectes.json','UTF-8');
	joueur = JSON.parse(listeMembres);

	for(i=0;i<joueur.length;i++){
		if(joueur[i].etat !== "ATTENTE"){
			if(joueur[i].pseudo === query.pseudo){
				page = fs.readFileSync('salle_attente.html','UTF-8');
				joueur[i].etat = "ATTENTE";
				listeMembres = JSON.stringify(joueur);
				fs.writeFileSync('connectes.json', listeMembres, 'UTF-8');
			}
			break;
		}

		//SI DEJA QUELQU'UN DANS SALLE ATTENTE

		else {
			page = fs.readFileSync('joueur_passif.html','UTF-8');
			joueur[i].etat = "JEU";
			listeMembres = JSON.stringify(joueur);
			fs.writeFileSync('connectes.json', listeMembres, 'UTF-8');
		}
		break;
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page)
		res.end();
};

//-------------------------------------------------------------------------

module.exports = trait;
