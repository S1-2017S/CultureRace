// modifier_questionnaire.js
//==================================================================
// Traitement de "req_modifier_questionnaire"
// Auteur: Achraf
// Version : 16/01/2018
//==================================================================
"use strict";
var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;
	var questions;
	var reponses;
	var radio;
	var affichage;
	var i;

	//ON CREE UN NOUVEAU JSON PORTANT LE MEME NOM QUE LE PRECEDENT, EN REPRE	NANT LES DONNEES DE LA PAGE AINSI QUE LES MODIFICATIONS APPORTEES.

	var questions = document.querySelectorAll('input[name=questions]');
	var reponses = document.querySelectorAll('input[name=reponse]');
	var radios = document.querySelectorAll('input[name=reponse]');
	
//	for(i=0;i<

	page = fs.readFileSync('affichage_questionnaire.html','UTF-8');
	marqueurs = {};
	marqueurs.modifie = "Le questionnaire a bien été modifié!";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();
};

//-----------------------------------------------------------------

module.exports = trait;
