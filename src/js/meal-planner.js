/*
 * This file encapsulates a meal planner.
 * The meal planner is capable of examining ingredients in cook books and in the fridge.
 * The idea is to recommend what to cook next.
 * Favour is given to recipes that involve ingredients about to expire.
 * 
 * Usage:
 * 
 * 		// Create a new fridge object. See fridge.js for detailed comments.
 * 		var fridge = new Fridge();
 * 		// Initialise it for the CSV of ingredients.
 * 		var errors = fridge.initForCsv(ingredientsAsCsv);
 * 		// Check for errors and if there are none, create a recipes object.
 * 		var cookBook = new CookBook();
 * 		// Initialise it for the JSON of recipes.
 * 		errors = cookBook.initForJson(recipesAsJson);
 * 		// Construct the meal planner to use the cook book and fridge we just created. 
 * 		var mealPlanner = new MealPlanner(recipesJson, fridge);
 * 		// Find out what the next meal will be.
 * 		var recommendation = mealPlanner.recommendNextMeal();
 */


function MealPlanner(cookBook, fridge) {
	this.cookBook = cookBook;
	this.fridge = fridge;
}

MealPlanner.prototype = {

	constructor : MealPlanner,
	
	/*
	 * Returns the recommended next meal based on the current recipes and fridge contents.
	 * If no meal can be prepared using ingredients in the fridge, an alternative is suggested. 
	 */
	recommendNextMeal : function() {
		// We want to cook a recipe containing an ingredient with the earliest expiry date. 
		var possibleMealDetails = new Array();
		var recommendedRecipe = "Order Takeout";
		// For each recipe in the cook book...
		for (var r = 0; r < this.cookBook.length; r++) {
			var earliestIngredientExpiry = (new Date()).setFullYear(9999, 12, 31);
			var recipe = this.cookBook[r];
			// For each ingredient in the recipe...
			for (var i = 0; i < recipe.ingredients.length; i++) {
				var ingredient = recipe.ingredients[i];
				// See if this ingredient is not in the fridge by trying to get the use-by date.
				var ingredientInFridge = this.fridge.getIngredientByItemName(ingredient.item);
				var expiryDate = ingredientInFridge.expiryDate;
				if (expiryDate == null) {
					// Move onto the next recipe in the cook book.
					break;
				}
				// See if the ingredient has passed its use-by date.
				if ((new Date()).getTime() > expiryDate.getTime()) {
					// Move onto the next recipe in the cook book.
					break;
				}
				// See if there is not enough of this ingredient.
				if (ingredient.amount > ingredientInFridge.amount) {
					// Move onto the next recipe in the cook book.
					break;
				}
				// See if this ingredient is going to expire before the earliest we have recorded for this recipe.
				if (earliestIngredientExpiry.getTime() > expiryDate.getTime()) {
					// Replace our prior 'earliest' with this new 'earliest'.
					earliestIngredientExpiry = expiryDate;
				}
				// See if this is the last ingredient required in the recipe.
				if ((i + 1) == recipe.ingredients.length) {
					// If we got this far it means we have a meal that can be prepared, but is it the best option?
					// We won't know until we've looked at all of them. Keep this one in mind though.
					possibleMealDetails.push(
						{"recipeName":recipe.name, "earliestIngredientExpiry" : earliestIngredientExpiry}
					);
				}
			}
		}
		earliestIngredientExpiry = (new Date()).setFullYear(9999, 12, 31);
		// Go through each possible meal looking for the one with the earliest ingredient expiry date.
		for (var m = 0; m < possibleMealDetails.length; m++) {
			// See if this meal is going to expire before the earliest we've found so far.
			if (earliestIngredientExpiry.getTime() > possibleMealDetails.earliestIngredientExpiry.getTime()) {
				// Replace our prior 'earliest' with this new 'earliest'.
				earliestIngredientExpiry = possibleMealDetails.earliestIngredientExpiry;
				recommendedRecipe = possibleMealDetails.recipeName;
			}
		}
		return recommendedRecipe;
	}

};
