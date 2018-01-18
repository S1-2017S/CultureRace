//modifier_compte.js

//==================================================================
// Traitement de "req_modifier_compte"
// Auteur: Achraf
// Version : 06/12/2017
//==================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var listePseudo;
	var membre = {};
	var i;
	var newPwd;

	//AFFICHER PAGE AVEC PASSWORD MODIFIE

	listePseudo = fs.readFileSync('../membres.json', 'utf-8');
	membre = JSON.parse(listePseudo);
	
	i=0;
	while(i<membre.length){
		if(membre[i].pseudo === query.pseudo) {	
			membre[i].password = query.password;
			listePseudo = JSON.stringify(membre);
			fs.writeFileSync("../membres.json", listePseudo, 'UTF-8');
		}	
		i++;
	}
	page = fs.readFileSync('modification_compte.html','UTF-8');
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.password = query.password;
	marqueurs.modifie = "Le mot de passe a bien été modifié!";
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//----------------------------------------------------------------

module.exports = trait;
