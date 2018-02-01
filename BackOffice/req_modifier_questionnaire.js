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
	var marqueurs = {};
	var i;
	var j;
	var questionnaire;
	var reponses = [];
	var br;
	var affichage;
	var liste = [];
	var contenu;

	questionnaire = [];
	for(i = 0; i < query.number; i++){
		bloc = {};
		bloc.question = query["questions" + String(i)];
		for(j = 0; j < 4; j++){
			reponse[j] = query["reponse" + String(j)];
			bloc.reponse = reponse;
			if(query["Q" + i + "_bon"] === "0"){
				bloc.br = 0;
			}else if(query["Q" + i + "_bon"] === "1"){
				bloc.br = 1;
			}else if(query["Q" + i + "_bon"] === "2"){
				bloc.br = 2;
			}else if(query["Q" + i + "_bon"] === "3"){
				bloc.br = 3;
			}
		}
		questionnaire.push(bloc);
	}
	questionnaire = JSON.stringify(questionnaire);
	fs.writeFileSync(query.questionnaire + ".json", questionnaire, "UTF-8");

	liste = fs.readFileSync('../Questionnaires/' + query.questionnaire, "UTF-8");
	contenu = JSON.parse(liste);
	for(i = 0; i<contenu.length; i++) {
		br0 = "";
		br1 = "";
		br2 = "";
		br3 = "";
		if(contenu[i].br === 0){
			br0 = "checked";
		} else if (contenu[i].br === 1){
			br1 = "checked";
		} else if (contenu[i].br === 2){
			br2 = "checked";
		} else if (contenu[i].br === 3){
			br3 = "checked";
		}

		affichage = affichage + "Question : <input type='textarea' name='questions" + i + "' value='" + contenu[i].question + "' size='60px'><br>"
			affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp "+ br0 +"><input type='textarea' name='reponse0' value= '" + contenu[i].reponses[0] + "'><br>"
			affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp "+ br1 +"><input type='textarea' name='reponse1' value= '" + contenu[i].reponses[1] + "'><br>"
			affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp "+ br2 +"><input type='textarea' name='reponse2' value= '" + contenu[i].reponses[2] + "'><br>"
			affichage = affichage + "<input type='radio' name='reponse" + i + "' &nbsp " +br3 +"><input type='textarea' name='reponse3' value= '" + contenu[i].reponses[3] + "'><br><br>\n"
	}

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
