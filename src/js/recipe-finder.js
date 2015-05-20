/*
 * This file contains j-s functionality specifically for the recipe finder page.
 * Key functions to use include:
 * 
 * 		defaultSettings();
 * 		showRecommendation();
 */

var recipeFinder = {

	/*
	 * Sets the form input elements to their default settings. 
	 */
	defaultSettings : function() {
		// Set the ingredients form input element to the default ingredients.
		$('#fridge').val(this.defaultIngredients);
		// Set the recipes form input element to the default recipes.
		$('#cook-book').val(JSON.stringify(this.defaultRecipes));
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
	 * Reads the JSON cook book contents specification and constructs a CookBook object returning it.
	 * If there were any validation errors, these are displayed and null is returned.
	 */
	initCookBook : function() {
		var cookBook = new CookBook();
		// Get the shopping.
		var cookBookContentsAsJson = $('#cook-book').val();
		// Put it in the cook book.
		errors = cookBook.initForJson(eval(cookBookContentsAsJson));
		// See if there were any validation errors.
		if (errors != null) {
			alert("You can't put that in the cook book.");
			$('#cook-book-errors').text(errors);
			return null;
		}
		return cookBook;
	},
	
	/*
	 * Reads the CSV fridge contents specification and constructs a Fridge object returning it.
	 * If there were any validation errors, these are displayed and null is returned. 
	 */
	initFridge : function() {
		var fridge = new Fridge();
		// Get the shopping.
		var fridgeContentsAsCsv = $('#fridge').val();
		// Put it in the fridge.
		errors = fridge.initForCsv(fridgeContentsAsCsv);
		// See if there were any validation errors.
		if (errors != null) {
			alert("You can't put that in the fridge.");
			$('#fridge-errors').text(errors);
			return null;
		}
		return fridge;
	},
	
	/*
	 * Performs any validation and shows any errors before showing the recommendation.
	 */
	showRecommendation : function() {
		var cookBook = this.initCookBook();
		var fridge = this.initFridge();
		var mealPlanner = new MealPlanner(cookBook, fridge);
		var nextMealRecommended = mealPlanner.recommendNextMeal();
		$('#recommendation').text(nextMealRecommended);
	},

};