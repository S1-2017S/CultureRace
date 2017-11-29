//===========================================================================
// Traitement de req_terminer
// Auteur : Achraf, Djibril, Ismael
// Version du 29/11/2017
//===========================================================================

"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

   //ON REVIENT A ACCUEIL MEMBRE

   page = fs.readFileSync('accueil_membre.html', 'UTF-8');

   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write(page);
   res.end();

};

//===========================================================================

module.exports = trait;
