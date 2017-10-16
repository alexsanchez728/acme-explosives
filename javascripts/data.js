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