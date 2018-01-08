//afficher_page_modification.js

//=========================================================================
// Traitement de "req_afficher_page_modification"
// Auteur: Achraf
// Version : 05/01/2018
//=========================================================================
"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var listePseudo;
	var membre = {};
	var i;

	//Si le compte existe bien

	listePseudo = fs.readFileSync('../membres.json', 'utf-8');
	membre = JSON.parse(listePseudo);

	for(i=0;i<membre.length;i++){
		if(query.pseudo === membre[i].pseudo){
			page = fs.readFileSync('modification_compte.html','UTF-8');

			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
			marqueurs.password = membre[i].password;
			marqueurs.modifie = "";
			page = page.supplant(marqueurs);

			break;
		}

		//Si le compte n'existe pas

		else {
			page = fs.readFileSync('choix_pseudo_modifier.html','UTF-8');
			marqueurs = {};
			marqueurs.erreur = "Ce pseudo n'existe pas!"
			page = page.supplant(marqueurs);

		}
	}
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//--------------------------------------------------------------------------

module.exports = trait;
