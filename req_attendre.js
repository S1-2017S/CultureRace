//=========================================================================
// Traitement de "req_attendre"
// Auteur : Achraf, Djibril, ISmael
// Version : 23/11/2017
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var joueur;
	var page;
	var trouve;

	// ON VERIFIE LE NOMBRE DE JOUEURS
    
	joueur = 0
	trouve = false;
	
	while(joueur < 1 && trouve === false){
	     if(joueur === 1) {
		    trouve = true;
			}
	}	

	// ON RENVOIT UNE PAGE HTML 

	if(trouve === false) {
		
		// SI PAS DE JOUEUR

		page = fs.readFileSync('salle_attente.html', 'UTF-8');
        
		joueur++

	} else {
		// SI DEJA JOUEUR

		page = fs.readFileSync('joueur_passif.html', 'UTF-8');

		joueur--
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;

