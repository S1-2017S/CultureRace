// testliste.js


"use strict"

var test_liste = function () {

	var liste1 = [];
	var liste2 = [];
	var n;

	liste1[0] = 0;
	liste1[1] = 1;
	liste1[2] = 2;
	liste1[3] = 3;
	liste1[4] = 4;
	liste1[5] = 5;
	liste1[6] = 6;
	liste1[7] = 7;
	liste1[8] = 8;
	liste1[9] = 9;

	n= Math.floor(Math.random() *liste1.length)
	liste2[0] = liste1[n];
	liste1.splice(n, 1);

	n= Math.floor(Math.random() *liste1.length)
	liste2[1] = liste1[n];
	liste1.splice(n, 1);

	n= Math.floor(Math.random() *liste1.length)
	liste2[2] = liste1[n];
	liste1.splice(n, 1);

	n= Math.floor(Math.random() *liste1.length)
	liste2[3] = liste1[n];
	liste1.splice(n, 1);

	n= Math.floor(Math.random() *liste1.length)
	liste2[4] = liste1[n];
	liste1.splice(n, 1);

	n= Math.floor(Math.random() *liste1.length)
	liste2[5] = liste1[n];
	liste1.splice(n, 1);


	n= Math.floor(Math.random() *liste1.length)
	liste2[6] = liste1[n];
	liste1.splice(n, 1);

	n= Math.floor(Math.random() *liste1.length)
	liste2[7] = liste1[n];
	liste1.splice(n, 1);

	n= Math.floor(Math.random() *liste1.length)
	liste2[8] = liste1[n];
	liste1.splice(n, 1);


	n= Math.floor(Math.random() *liste1.length)
	liste2[9] = liste1[n];
	liste1.splice(n, 1);

	return liste1;

};

module.exports = test_liste;

