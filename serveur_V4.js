//============================================================================
// SERVEUR VERSION 4
// Patrice ThirÃ©
// 3/10/2015
//============================================================================

"use strict";

var http = require("http");
var url = require("url");
var fs = require("fs");
require("remedial");
var mon_serveur;
var port;

// FONCTION DE TRAITEMENT D'UNE REQUETE

var traite_requete = function (req, res) {

	var ressource;
	var requete;
	var pathname;;
	var query;

	// RECUPERATION DE L'URL (REQUETE)

	console.log("url reÃ§ue : " + req.url);

	// ANALYSE DE L'URL (SEPARATION DU PATH ET DE LA QUERY STRING)

	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	console.log("pathname : " + pathname);
	console.log("query string (compte) : " + query.compte);
	console.log("query string (mdp) : " + query.mdp);

	// FABRICATION DE LA PAGE HTML A RENVOYER AU NAVIGATEUR

	var ressource = fs.readFileSync("accueil.html", "UTF-8");

	var patch = {};
	patch["nom"] = query.compte;
	ressource = ressource.supplant(patch);

	// ENVOI DE LA PAGE HTML A RENVOYER AU NAVIGATEUR

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(ressource);
	res.end();
};

// CREATION ET LANCEMENT DU SERVEUR

mon_serveur = http.createServer(traite_requete);
port = 5000;
console.log("listen port " + port);
mon_serveur.listen(port);
