/*
 * This file encapsulates a cook book.
 * A cook book contains a list (i.e. array) of recipes that can be used for preparing meals.
 * Each recipe in turn contains a list of ingredients needed for the meal.
 * 
 * A list of recipes are provided in JSON format to initialise a CookBook object like the following: 
 * [
 * 	{
 * 		"name": "grilled cheese on toast",
 * 		"ingredients": [
 * 			{ "item":"bread", "amount":"2", "unit":"slices"},
 * 			{ "item":"cheese", "amount":"2", "unit":"slices"}
 * 		]
 * 	}
 * 	,
 * 	{
 * 		"name": "salad sandwich",
 * 		"ingredients": [
 * 			{ "item":"bread", "amount":"2", "unit":"slices"},
 * 			{ "item":"mixed salad", "amount":"100", "unit":"grams"}
 * 		]
 * 	}
 * ]
 * 
 * Usage:
 * 
 * 		// Create a new CookBook object.
 * 		var cookBook = new CookBook();
 * 		// Initialise it for the JSON of recipes.
 * 		var errors = cookBook.initForJson(recipesAsJson);
 * 		// Check for errors.
 */


function CookBook() {
	this.recipes = new Array();
}

CookBook.prototype = {

	constructor : CookBook,
	
	/*
	 * Initialises the CookBook object for the given list of recipes in JSON format.
	 * Returns null if the format is valid and an error message otherwise. 
	 */
	initForJson : function(recipesAsJson) {
		// Empty the cook book initially.
		this.recipes.length = 0;
		var errors = null;
		// For each element in the top level JSON array...
		for (var i = 0; i < recipesAsJson.length; i++) {
			// Construct a recipe object.
			var recipe = new Recipe();
			// Initialise it with the JSON for this recipe.
			errors = recipe.initForJson(recipesAsJson[i]);
			// See if the JSON for this recipe was not what we expected.
			if (errors != null) {
				// Empty the cook book, it's all or nothing.
				this.recipes.length = 0;
				return errors;
			}
			// TODO Should we check for duplicates before adding this recipe to the cook book?
			// Add this recipe to the cook book.
			this.recipes.push(recipe);
		}
		return null;
	},

	/*
	 * Returns a readable string representation of the properties set within the cook book.
	 * E.g. "cheese on toast: bread,2,slices -new-line- cheese,2,slices -new-line-
	 * 		 salad sandwich: bread,2,slices -new-line- mixed salad,100,grams".
	 */
	toCsv : function() {
		var result = "";
		// For each recipe in the cook book...
		for (var i = 0; i < this.recipes.length; i++) {
			// See if we need a separator.
			if (i > 0) {
				result += "\n";
			}
			result += this.recipes[i].toCsv();
		}
		return result;
	}

};
