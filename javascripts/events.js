"use strict";

const data = require("./data");
const dom = require("./dom");

let selector = $("#categorySelector");

// fire the function to get all data form db
let allProducts = data.productGetter();
let fireworksOnly = data.fireworksGetter();
let demoOnly = data.demoGetter();

let ItemsBasedOnCategory = [];

// get the dropdown selection

selector.on("click", (event) => {

	let currentSelection = event.target.innerHTML;

// when one category is selected, use the appropriate Getter function
	if (currentSelection === "Fireworks") {
		ItemsBasedOnCategory = fireworksOnly;
	} else if (currentSelection === "Explosives"){
		ItemsBasedOnCategory = demoOnly;
	} else {
		ItemsBasedOnCategory = allProducts;
	}

	// save that as a new array, send that to the printer
	dom.makeProductDisplay(ItemsBasedOnCategory); // This works here at least

});






