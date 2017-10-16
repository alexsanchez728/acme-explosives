(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// const dom = require("./dom");

let categories = [];
let types = [];
let productsArray = [];
let fireworksArray = [];
let demolitionArray = [];

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

const productGetter = () => {
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
				if (product[Object.keys(product)].categoryName === "Fireworks") {
					fireworksArray.push(product);
				} else {
					demolitionArray.push(product);
				}
			productsArray.push(product);

			}); // end productResults.forEach()
		}); // end product results
	
		return productsArray;
	}; // end getter

// const initializer = () => {
// 	productGetter();
// 	console.log("output final array of prods", productsArray);
// 	dom.makeProductDisplay(productsArray);
// };

const demoGetter = () => {
	return demolitionArray;
};

const fireworksGetter = () => {
	return fireworksArray;
};


module.exports = {productGetter, demoGetter, fireworksGetter};
},{}],2:[function(require,module,exports){
"use strict";

const outputDiv = $("#output");

const makeProductDisplay = (products) => {
	// Clear outputDiv so items to list infinitely
	outputDiv.html("");

	for (let i=0; i < products.length; i++) {

		for (const prod in products[i]) {

			let currentProduct = products[i][prod];

			let domString = "";
			domString		+= `<div class="productCard">`;
			domString			+= `<h3>${currentProduct.name}</h3>`;
			domString			+= `<h4>${currentProduct.categoryName}</h4>`;
			domString			+= `<h5>${currentProduct.typeName}</h5>`;
			domString			+= `<p>${currentProduct.description}</p>`;
			domString		+= `</div>`;
			printToDom(domString);
		}
	}
};

const printToDom = (string) => {
	outputDiv.append(string);
};


module.exports = {makeProductDisplay};
},{}],3:[function(require,module,exports){
"use strict";

const data = require("./data");
const dom = require("./dom");

let selector = $("#categorySelector");

// fire the function to get all data form db
let allProducts = data.productGetter();

let ItemsBasedOnCategory = [];

// get the dropdown selection

selector.on("click", (event) => {

	let currentSelection = event.target.innerHTML;
	
// when one category is selected, use the appropriate Getter function
	if (currentSelection === "Fireworks") {
		ItemsBasedOnCategory = data.fireworksGetter();
	} else {
		ItemsBasedOnCategory = data.demoGetter();
	}

	// save that as a new array, send that to the printer
	dom.makeProductDisplay(ItemsBasedOnCategory); // This works here at least

});







},{"./data":1,"./dom":2}],4:[function(require,module,exports){
"use strict";

// const data = require("./data");
$(document).ready(() => {
require("./events");
});

},{"./events":3}]},{},[4]);
