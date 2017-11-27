// quizz.js

"use strict";

var contenu;
var i;
var n;
var fs = require("fs");
var questionnaire;

contenu = fs.readFileSync("questionnaire.json", "utf-8");
questionnaire = JSON.parse(contenu);

console.log(questionnaire.length);
