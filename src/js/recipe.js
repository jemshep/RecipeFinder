/*
 * This file encapsulates a recipe.
 * A recipe contains a name and a list (i.e. array) of ingredients.
 * 
 * A recipe can be defined in JSON format like the following: 
 * 	{
 * 		"name": "grilled cheese on toast",
 * 		"ingredients": [
 * 			{ "item":"bread", "amount":"2", "unit":"slices" },
 * 			{ "item":"cheese", "amount":"2", "unit":"slices" }
 * 		]
 * 	}
 * 
 * Usage:
 * 
 * 		// Create a new Recipe object.
 * 		var recipe = new Recipe();
 * 		// Initialise it for the JSON recipe.
 * 		var errors = recipe.initForJson(recipeAsJson);
 * 		// Check for errors.
 */


function Recipe() {
	this.name = null;
	this.ingredients = new Array();
}

Recipe.prototype = {

	constructor : Recipe,
	
	/*
	 * Initialises the Recipe object for the given recipe in JSON format.
	 * Returns null if the format is valid and an error message otherwise. 
	 */
	initForJson : function(recipeAsJson) {
		this.name = recipeAsJson.name;
		this.ingredients.length = 0;
		// The following code may appear to be overkill, but we can't guarantee the JSON is valid. 
		// For each ingredient in the JSON given...
		for (var i = 0; i < recipeAsJson.ingredients.length; i++) {
			// Construct an Ingredient object.
			var ingredient = new Ingredient();
			// Initialise it with the JSON for this recipe.
			errors = ingredient.initForJson(recipeAsJson.ingredients[i]);
			// See if the JSON for this recipe was not what we expected.
			if (errors != null) {
				// Empty the recipe, it's all or nothing.
				this.name = null;
				this.ingredients.length = 0;
				return errors;
			}
			// TODO Should we check for duplicates before adding this ingredient to the recipe?
			// TODO Or should we increase the 'amount' for a duplicated ingredient?
			// Add this ingredient to the recipe.
			this.ingredients.push(ingredient);
		}
		return null;
	},
	
	/*
	 * Returns a readable string representation of the properties set within the recipe.
	 * E.g. "cheese on toast: bread,2,slices -new-line- cheese,2,slices".
	 */
	toCsv : function() {
		var result = "";
		// See if there is an item.
		if (this.name != null) {
			// See if we need a separator.
			if (result.length > 0) {
				result += ",";
			}
			result += this.name + ": ";
		}
		// For each ingredient in the recipe...
		for (var i = 0; i < this.ingredients.length; i++) {
			// See if we need a separator.
			if (i > 0) {
				result += "\n";
			}
			result += this.ingredients[i].toCsv();
		}
		return result;
	}

};
