//supprimer_compte.js

//==============================================================
// Traitement de "req_supprimer_compte"
// Auteur: Achraf
// Version : 07/12/2017
//================================================================
"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var i
	var listePseudo;
	var membre = {};

	//LE COMPTE EST SUPPRIME, ON EST DIRIGE VERS LA PAGE MESSAGE_CONFIRMATION

	listePseudo = fs.readFileSync('membres.json','UTF-8');
	membre = JSON.parse(listePseudo);

	for(i=0;i<membre.length;i++){
		if(query.pseudo === membre[i].pseudo){
			membre.splice(i,1);
			listePseudo = JSON.stringify(membre);
			fs.writeFileSync("membres.json", listePseudo, 'UTF-8');
			break;
		}
	}
	page = fs.readFileSync('message_confirmation.html','UTF-8');
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------

module.exports = trait;

