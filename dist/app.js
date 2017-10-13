(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const dom = require("./dom");

let categories = [];
let types = [];
let productsArray = [];

const categoriesJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/categories.json").done((data) => {
			resolve(data.categories);
		}).fail((error1) => {
			reject(error1);
		});
	});
};

const typesJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/types.json").done((data2) => {
			resolve(data2.types);
		}).fail((error2) => {
			reject(error2);
		});
	});
};

const productsJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/products.json").done((data1) => {
			resolve(data1.products);
		}).fail((error3) => {
			reject(error3);
		});
	});
};


// This is the way
var productGetter = () => {
	categoriesJSON().then((categoryResults) => {
		categoryResults.forEach((category) => {
			categories.push(category);
		});
		return typesJSON();
		 // End 1st, begin second
	}).then((typeResults) => {
		typeResults.forEach((type) => {
			types.push(type);
		});
	return productsJSON();
	 // end 2nd, begin 3rd
	}).then((productResults) => {

		productResults.forEach((product) => {

		console.log("opening each object", product[Object.keys(product)]);
		// console.log("access items", product[Object.keys(product)].id);

			categories.forEach((category) => {
				types.forEach((type) => {

					if (type.category === category.id) {
						type.categoryName = category.name; // Each type now has the coresponding firework/explosive on it
					}
					if (product[Object.keys(product)].type === type.id) {
						product[Object.keys(product)].typeName = type.name; // type is assigned by type #
						product[Object.keys(product)].categoryName = type.categoryName; // passing along the category name from type object
					}
				}); // end types.forEach()
			}); // end categories.forEach()

		productsArray.push(product);
		}); // end productResults.forEach()

	// make(); // will initialize the dom builder
	}); // end product results

}; // end getter

const initializer = () => {
	productGetter();
			console.log("output final array of prods", productsArray);
};



module.exports = {initializer};
},{"./dom":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
"use strict";

const data = require("./data");

$(document).ready(() => {
	data.initializer();
});

},{"./data":1}]},{},[3]);
