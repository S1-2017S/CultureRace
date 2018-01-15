//========================================================================
// Traitement de "req_supprimer_questionnaire"
// Auteur: Achraf
// Version : 15/01/2017
//========================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	
	//ON SUPPRIME LE JSON SELECTIONNE

	fs.unlinkSync("../Questionnaires/" + query.questionnaire);

	page = fs.readFileSync('questionnaire_supprime.html','utf-8');

	marqueurs = {};
	marqueurs.query = query.questionnaire;
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};
//-----------------------------------------------------------------------
module.exports = trait;
