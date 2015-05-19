/*
 * This file contains j-s functionality specifically for the recipe finder page.
 *
 * Key functions to use include:
 * 		defaultSettings();
 * 		showRecommendation();
 * 		hideRecommendation();
 * 
 * Other functions of interest include:
 * 		defaultIngredients();
 * 		defaultRecipes();
 * 		showIngredientErrors();
 * 		showRecipeErrors();
 */

var recipeFinder = {

	/*
	 * Sets the form input elements to their default settings. 
	 */
	defaultSettings : function() {
		// TODO Set the ingredients form input element to the default ingredients.
		// TODO Set the recipes form input element to the default recipes.
	},
	
	/*
	 * The default ingredients that give the user an idea of the format and something to start with.  
	 */
	defaultIngredients : 'bread,10,slices,25/12/2014' + '\n' +
		'cheese,10,slices,25/12/2014' + '\n' +
		'butter,250,grams,25/12/2014' + '\n' +
		'peanut butter,250,grams,2/12/2014' + '\n' +
		'mixed salad,150,grams,26/12/2013',
		
	/*
	 * The default recipes that give the user an idea of the format and something to start with.  
	 */
	defaultRecipes :	[
	                	 {
	                		 "name": "grilled cheese on toast",
	                    	 "ingredients": [
	                    	  			{ "item":"bread", "amount":"2", "unit":"slices"},
	                    	  			{ "item":"cheese", "amount":"2", "unit":"slices"}
	                    	 ]
	                	 }
	                	 ,
	                	 {
	                    	"name": "salad sandwich",
	                    	"ingredients": [
	                    		{ "item":"bread", "amount":"2", "unit":"slices"},
	                    		{ "item":"mixed salad", "amount":"100", "unit":"grams"}
	                    	]
	                	 }
	                    ],
	
	/*
	 * Performs any validation and shows any errors before showing the recommendation.
	 */
	showRecommendation : function() {
		// TODO Validate the ingredients and show any errors.
		// TODO Validate the recipes and show any errors.
		// TODO Calculate the recommendation and show it.
	},
	
	/*
	 * Hides any previously displayed recommendation.
	 */
	hideRecommendation : function() {
		// TODO Hide any recommendation.
	}

};