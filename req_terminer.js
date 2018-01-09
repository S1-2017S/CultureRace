//===========================================================================
// Traitement de req_terminer
// Auteur : Achraf, Djibril, Ismael
// Version du 29/11/2017
//===========================================================================

"use strict"

var fs = require("fs");
var page 
require('remedial');

var trait = function (req, res, query) {

   var marqueurs;
   var contenu_fichier;
   var listeConnectes = [];
   var player;  
   var i;
   var trouve;
   var Joueur;

   contenu_fichier = fs.readFileSync('connectes.json', 'UTF-8');
   listeConnectes = JSON.parse(contenu_fichier);


   //ON REVIENT A ACCUEIL MEMBRE


   trouve = false;
   i=0
	while(i<listeConnectes.length && trouve === false) {
		if(listeConnectes[i].pseudo === query.pseudo) {
			Joueur = listeConnectes[i].adv;
			trouve=true;
	} else {
	i++
	}
	}
	
	i=0;
	trouve = false
	while(listeConnectes.length && trouve === false) {
		if(listeConnectes[i].pseudo === Joueur) {
			if(listeConnectes[i].etat === "JEU") {
				fs.unlinkSync("partie"+listeConnectes[i].NP+".json");
				trouve = true;
			} else {
				trouve = true;
			}
		} else {
		i++;
		}
	}
			
	player = {};
	player.pseudo = query.pseudo;
	player.etat = "LIBRE";

   for(i=0; i<listeConnectes.length; i++) {
      if(listeConnectes[i].pseudo === query.pseudo) {
	      listeConnectes[i] = player;
      }
   }

   contenu_fichier = JSON.stringify(listeConnectes);
   fs.writeFileSync('connectes.json', contenu_fichier, 'UTF-8');

   marqueurs = {};
   marqueurs.pseudo = query.pseudo;

   page = fs.readFileSync('accueil_membre.html', 'UTF-8');

   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write(page);
   res.end();

};

//===========================================================================

module.exports = trait;
