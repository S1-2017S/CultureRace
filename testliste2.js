//testliste2.js

"use strict";

var liste1 = [];
var liste2 = [];
var n;
var i;

n=1;

for(i=0; i<10; i++) {
	liste1[i] = n;
	n++;
}

for(i=0; i<10 ; i++) {
	n = Math.floor(Math.random() * liste1.length);
	liste2[i] = liste1[n];
	liste1.splice(n, 1);
}

console.log(liste1);
console.log(liste2);
