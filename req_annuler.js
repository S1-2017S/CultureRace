
//=========================================================================
// Retour a la page Accueil
// Auteur : Achraf, Djibril, Ismael
// Version : 21/11/2017
//=========================================================================

"use strict";

var fs = require("fs");
var path = require("remedial");

var annuler = function (req, res, query) {

    var marqueurs;
	var page;

	// AFFICHAGE PAGE D'ACCUEIL

	page = fs.readFileSync("accueil.html", "utf-8"):

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.compte = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/plain'});

	res.write('ERREUR SERVEUR');

	res.end();
};

//--------------------------------------------------------------------------

module.exports = annuler;



