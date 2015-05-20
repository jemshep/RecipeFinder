/*
 * This file encapsulates the concept of a refrigerator, specifically their contents i.e. ingredients for cooking.
 * 
 * Usage:
 * 
 * 		// Create a fridge object.
 * 		var fridge = new Fridge();
 * 		// Initialise the fridge with contents.
 * 		var errors = fridge.initForCsv(ingredientsList);
 * 		// Returns null if contents are valid or an error message if invalid.
 * 
 * 		// Get the use-by date for the ingredient.
 * 		var expiryDate = fridge.getIngredientByItemName(ingredientName).expiryDate;
 * 		// Returns null if the ingredient is not in the fridge or the date when the ingredient expires.
 * 
 * Ingredients are defined as rows of CSV matching the example following...
 * 
 * bread,10,slices,25/12/2014
 * cheese,10,slices,25/12/2014
 * butter,250,grams,25/12/2014
 * peanut butter,250,grams,2/12/2014
 * mixed salad,150,grams,26/12/2013
 * 
 * Each row contains 4 parts separated by commas: item,amount,unit,expiry date.
 */

function Fridge() {
	this.ingredients = new Array();
}

Fridge.prototype = {

	constructor : Fridge,
	
	/*
	 * Initialises the fridge object according to the ingredients CSV given.
	 * The format of the parameter given is expected to be like...
	 * 
	 * 		bread,10,slices,25/12/2014
	 * 		cheese,3,slices,5/1/2015
	 * 
	 * If the parameter is invalid, an error message is returned, otherwise null is returned.
	 */
	initForCsv : function(ingredients) {
		// Clean out the fridge and start fresh.
		this.ingredients.length = 0;
		var errors = null;
		if (ingredients == null) {
			return "No ingredients CSV. Use this format: 'bread,10,slices,25/12/2014 -new-line- cheese,3,slices,5/1/2015'.";
		}
		// Split the ingredients up into rows.
		var ingredientList = ingredients.split('\n');
		// For each ingredient CSV row...
		for (var i = 0; i < ingredientList.length; i++) {
			// Create a new ingredient object.
			var ingredient = new Ingredient();
			// Validate this ingredient's CSV parts.
			errors = ingredient.initForCsv(ingredientList[i]);
			// See if there were any issues with this.
			if (errors != null) {
				// Empty the array so far - it's all or nothing.
				this.ingredients.length = 0;
				// And of course return an explanation.
				return "Invalid ingredient, row " + (i + 1) + " " + errors;
			}
			// Find this ingredient in the fridge.
			var existingIngredient = this.getIngredientByItemName(ingredient.item);
			// See if this ingredient is not already in the fridge.
			if (existingIngredient == null) {
				// Store this ingredient in the fridge.
				this.ingredients.push(ingredient);
			} else {
				// Add to the amount of this ingredient already in the fridge.
				this.ingredients[i].amount += ingredient.amount;
			}
		}
		return null;
	},
	
	/*
	 * Returns an Ingredient from the fridge for the item name given.
	 * If the ingredient is not found in the fridge, null is returned.
	 */
	getIngredientByItemName : function(itemName) {
		if (itemName == null || itemName.length == 0) {
			return null;
		}
		// For each ingredient in the list...
		for (var i = 0; i < this.ingredients.length; i++) {
			// See if this ingredient's item name matches the one we're after.
			if (this.ingredients[i].item == itemName) {
				// Found it.
				return this.ingredients[i]; 
			}
		}
		// Couldn't find it, so...
		return null;
	},
	
	/*
	 * Empties the fridge of old ingredients.
	 */
	cleanFridge : function() {
		var todaysDate = new Date();
		// For each ingredient in the fridge...
		for (var i = 0; i < this.ingredients.length; i++) {
			// Get this ingredient's use-by date.
			var expiryDate = this.ingredients[i].expiryDate;
			// See if this ingredient has past its use-by date.
			if (todaysDate.getTime() > expiryDate.getTime()) {
				// Chuck this ingredient out of the fridge.
				this.ingredients.splice(i, 1);
				// Decrement the loop counter now our array has been reduced by one element.
				i--;
			}
		}
	}
	
};
