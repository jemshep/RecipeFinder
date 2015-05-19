/*
 * This file provides methods related to finding recipes using ingredients.
 * The key functions to use are:
 * 		var errors = validateIngredients(ingredients);
 * 		var errors = validateRecipes(recipes);
 * 		var recommendation = recommend(ingredients, recipes);
 * 
 * See these function comments for detailed explanation of use.
 * 
 * Ingredients are defined as CSV matching the example following...
 * 
 * bread,10,slices,25/12/2014
 * cheese,10,slices,25/12/2014
 * butter,250,grams,25/12/2014
 * peanut butter,250,grams,2/12/2014
 * mixed salad,150,grams,26/12/2013
 * 
 * Each row contains 4 parts: item, amount, unit and expiry date.
 * Valid values for units are defined in var validUnits;
 * 
 * A recipe is defined as JSON matching the example following...
 * 
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
 * Each recipe has a name and a list of ingredients.
 * Each ingredient has an item, amount and unit. 
 */

var recipeFinding = {
	
	/*
	 * Returns an error message if the given ingredients are invalid.
	 * Returns null if the ingredients are valid. 
	 */
	validateIngredients : function(ingredients) {
		// TODO Split the list of ingredients by row and validate each row.
		return null;
	},

	/*
	 * Returns an error message if the given recipes are invalid.
	 * Returns null if the recipes are valid. 
	 */
	validateRecipes : function(recipes) {
		// TODO Go through each recipe and validate it.
		return null;
	},
	
	/*
	 * Returns a recommended recipe from the list given that is applicable to the given ingredients.
	 * If no recipe is applicable, the recommendation returned will suggest an alternative. 
	 */
	recommend : function(ingredients, recipes) {
		// TODO Validate the ingredients and return any errors.
		// TODO Validate the recipes and return any errors.
		// TODO Calculate the recipe to cook.
		return null;
	},

	// Define the list of valid units that a recipe or ingredient can have.
	validUnits : ['of', 'grams', 'ml', 'slices'],
	
	/*
	 * Returns an error message if the given ingredient is incorrectly defined.
	 * Returns null if the ingredient is correctly defined.
	 */
	validateIngredient : function(ingredient) {
		// TODO Split the ingredient up into its parts.
		// TODO Validate the amount.
		// TODO Validate the unit.
		// TODO Validate the expiry date.
		return null;
	},
	
	/*
	 * Returns an error message if the given recipe is incorrectly defined.
	 * Returns null if the recipe is correctly defined.
	 */
	validateRecipe : function(recipe) {
		// TODO Validate the amount.
		// TODO Validate the unit.
		return null;
	},
	
	/*
	 * Returns an error message if the given ingredient/recipe amount is incorrectly defined.
	 * Returns null if the ingredient/recipe amount is correctly defined.
	 */
	validateAmount : function(amount) {
		// TODO Make sure the amount is a valid positive number.
		return null;
	},
	
	/*
	 * Returns an error message if the given ingredient/recipe unit is invalid.
	 * Returns null if the ingredient/recipe unit is valid.
	 */
	validateUnit : function(unit) {
		// TODO Make sure the unit is one of the valid units.
		return null;
	},
	
	/*
	 * Returns an error message if the given ingredient expiry date is invalid.
	 * Returns null if the ingredient expiry date is valid.
	 */
	validateExpiryDate : function(expiryDate) {
		// TODO Make sure the expiry date is correctly formatted.
		// TODO Make sure the expiry date is a valid date e.g. there is no 31st of June.
		return null;
	}
	
};
