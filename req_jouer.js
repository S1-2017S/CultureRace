//================================================================================
// Traitement de "req_jouer"
// Auteur : Achraf, Djibril, Ismael
// Version : 27/11/2017
//================================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
	var joueur;
	var trouve;

	// ON VERIFIE SI JOUEUR EST PASSIF

	if(joueur === 0) {
	
	    page = fs.readFileSync('joueur_actif.html', 'UTF-8');

    } else {

	    page = fs.readFileSync('salle_attente.html', 'UTF-8');

    }

	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
	res.end();
};

//================================================================================

module.exports = trait;

