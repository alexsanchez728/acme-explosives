"use strict";

const outputDiv = $("#output");

const makeProductDisplay = (products) => {
	// Clear outputDiv so items to list infinitely
	outputDiv.html("");

	for (let i=0; i < products.length; i++) {

		for (const prod in products[i]) {

			let currentProduct = products[i][prod];

			let domString = "";
			domString		+= `<div class="col-sm-4 text-center productCard ${currentProduct.categoryName === "Demolition" ? "card-bad" : "card-good"}">`;
			domString			+= `<h3>${currentProduct.name}</h3>`;
			domString			+= `<h4>Category: ${currentProduct.categoryName}</h4>`;
			domString			+= `<h5>Product Type: ${currentProduct.typeName}</h5>`;
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