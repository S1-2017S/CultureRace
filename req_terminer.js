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

   contenu_fichier = fs.readFileSync("connectes.json", "UTF-8");
   listeConnectes = JSON.parse(contenu_fichier);


   //ON REVIENT A ACCUEIL MEMBRE

   page = fs.readFileSync('accueil_membre.html', 'UTF-8');
   
   player = {};
   player.pseudo = query.pseudo;
   player.etat = "LIBRE";

   for(i=0; i<listeConnectes.length; i++) {
      if(listeConnectes[i].pseudo === query.pseudo) {
	      listeConnectes[i] = player;
      }
   }

   contenu_fichier = JSON.stringify(listeConnectes);
   fs.writeFileSync("connectes.json", contenu_fichier, "UTF-8");

   marqueurs = {};
   marqueurs.pseudo = query.pseudo;

   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write(page);
   res.end();

};

//===========================================================================

module.exports = trait;
