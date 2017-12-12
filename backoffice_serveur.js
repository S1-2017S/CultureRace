//=========================================================================
// Serveur Backoffice CultureRace
// Auteur : Achraf SIBAI
// Version : 09/10/2
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_erreur = require("./req_erreur.js");
var req_start = require("./req_start.js");
var req_afficher_compte = require("./req_afficher_compte");
var req_modifier_compte = require("./req_modifier_compte");
var req_confirmer_suppression = require("./req_confirmer_suppression");
var req_supprimer_compte = require("./req_supprimer_compte");
var req_lister_compte = require("./req_lister_compte");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var ressource;
	var requete;
	var pathname;;
	var query;
	var marqueur = {};

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
		case '/':
		case '/req_start':
			req_start(req, res, query);
			break;
		case '/req_lister_compte':
			req_lister_compte(req, res, query);
			break;
		case '/req_afficher_compte':
			req_afficher_compte(req, res, query);
			break;
		case '/req_modifier_compte':
			req_modifier_compte(req, res, query);
			break;
		case '/req_confirmer_suppression':
			req_confirmer_suppression(req, res, query);
			break;
		case '/req_supprimer_compte':
			req_supprimer_compte(req, res, query);
			break;
		}	
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 3000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
