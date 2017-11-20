"use strict";

var kbd = require("kbd");
var fs = require("fs");
var questionnaire;
var contenu;
var i;
var n;
var rep;
var br;
var compt1;
var compt2;
var tour;
var Joueur1;
var Joueur2;

tour = 0;
compt1 = 0;
compt2 = 0;

process.stdout.write("Joueur 1 : ");
Joueur1 = kbd.getLineSync();
process.stdout.write("Joueur 2 : ");
Joueur2 = kbd.getLineSync();

do {

	tour = 0;

	if(tour === 0) { 

		contenu = fs.readFileSync("questionnaire.json", "utf-8");
		questionnaire = JSON.parse(contenu);

		n = Math.floor(Math.random() *questionnaire.length);

		console.log("c'est le tour de " + Joueur1);
		console.log(questionnaire[n].question)

			for(i=0; i<questionnaire[n].reponses.length; i++) {
				console.log((i+1) + " : " + questionnaire[n].reponses[i]);
			}
		process.stdout.write("Answer : ");
		rep = Number(kbd.getLineSync());
		if(rep === questionnaire[n].br + 1) {
			console.log("Bien vu");
			compt1++;
		} else {
			console.log("t'es nul");
		}

		console.log("Joueur 1 : " + compt1 + "/4");
	}
	if(compt1 < 4) {
		tour++;
	}

	if(tour === 1) { 

	contenu = fs.readFileSync("questionnaire.json", "utf-8");
	questionnaire = JSON.parse(contenu);

	n = Math.floor(Math.random() *questionnaire.length);

	console.log("c'est le tour de " + Joueur2);
	console.log(questionnaire[n].question)

		for(i=0; i<questionnaire[n].reponses.length; i++) {
			console.log((i+1) + " : " + questionnaire[n].reponses[i]);
		}
		process.stdout.write("Answer : ");
		rep = Number(kbd.getLineSync());
		if(rep === questionnaire[n].br + 1) {
			console.log("Bien vu");
			compt2++;
		} else {
			console.log("t'es nul");
		}

		console.log("Joueur 2 : " + compt2 + "/4");
	}

}while(compt1 < 4 && compt2 < 4 )

if(compt1 === 4) {
	console.log("Bravo " + Joueur1 +  " a gagné");
}

if(compt2 === 4) {
	console.log("Bravo " + Joueur2 + " a gagné");
}
