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
	var i;
	var modifie;
	var questions;
	var reponses;
	var radios;
	var d;

	//ON CREE UN NOUVEAU JSON PORTANT LE MEME NOM QUE LE PRECEDENT, 
	//EN REPRENANT LES DONNEES DE LA PAGE AINSI QUE LES MODIFICATIONS APPORTEES.

	i=0;
	questions = query.questions;
	reponses = query.questions;
	radios = query.br;

	console.log(questions);
	console.log(reponses);
	console.log(radiots);
	for(i=0;i<questions.length;i++)

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
