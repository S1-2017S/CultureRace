//page_nouveau_questionnaire.js

//===================================================================
// Traitement de "req_page_nouveau_questionnaire"
// Auteur: Achraf
// Version : 17/01/2018
//===================================================================
"use strict";

var fs = require("fs");
require("remedial");

var trait = function(req, res, query) {

	var marqueurs;
	var page;
	var i;
	var j;
	var html;
	var affichage;
	var br;
	var j;

	//ON AFFICHE UN NOUVEAU QUESTIONNAIRE VIERGE

	affichage = "";
	br ="";
	j=0;
	for(i=0;i<query.nombre;i++){
		affichage = affichage + "Question "+ (i + 1) +": <input type='textarea' name='questions" + i + "' value='" + i + "' size='60px'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp value='" + (i + 0 + j) + "'><input type='textarea' name='reponse" + Number(0 + j) + "' value= '" + (j + 0) + "'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp value='" + (i + 1 + j) + "'><input type='textarea' name='reponse" + Number(1 + j) + "' value= '" + (j + 1) + "'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp value='" + (i + 2 + j) + "'><input type='textarea' name='reponse" + Number(2 + j) + "' value= '" + (j + 2) + "'><br>"
		affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp value='" + (i + 3 + j) + "'><input type='textarea' name='reponse" + Number(3 + j) + "' value= '" + (j + 3) + "'><br><br>\n"
		j = j + 4; 
	}

	page = fs.readFileSync('nouveau_questionnaire.html','UTF-8');
	marqueurs = {};
	marqueurs.nb = query.nombre;
	marqueurs.nvQ = affichage;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------

module.exports = trait;
