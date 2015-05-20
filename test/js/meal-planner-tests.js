/*
 * This file contains tests for Meal Planners. It tests the code in meal-planner.js. 
 */


QUnit.test('MealPlanner test - recommendNextMeal', function(assert) {
	var mealPlanner = null;
	var fridge = new Fridge();
	var cookBook = new CookBook();
	var actual = null;
	var result = null;
	var test = null;
	var errors = null;
	var ingredientsAsCsv = null;
	var recipesAsJson = null;

	ingredientsAsCsv = "";
	ingredientsAsCsv += "bread,10,slices,25/12/2014" + "\n";
	ingredientsAsCsv += "cheese,10,slices,25/12/2014" + "\n";
	ingredientsAsCsv += "butter,250,grams,25/12/2014" + "\n";
	ingredientsAsCsv += "peanut butter,250,grams,2/12/2014" + "\n";
	ingredientsAsCsv += "mixed salad,150,grams,26/12/2013";
	errors = fridge.initForCsv(ingredientsAsCsv);
	if (errors != null) {
		alert('Fridge initialisation failed with...\n\n' + errors);
	}
	recipesAsJson = 	[
		         		 	{
		        		 		"name" : "grilled cheese on toast",
		        		 		"ingredients" :	[
		        		 		               	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		               	 	{ "item":"cheese", "amount":"2", "unit":"slices"}
		        		 		               	]
		        		 	}
		        		 	,
		        		 	{
		        		 		"name": "salad sandwich",
		        		 		"ingredients":	[
		        		 		              	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		              	 	{ "item":"mixed salad", "amount":"100", "unit":"grams"}
		        		 		              	]
		        		 	}
	        		 	];
	errors = cookBook.initForJson(recipesAsJson);
	if (errors != null) {
		alert('Cook book initialisation failed with...\n\n' + errors);
	}
	test = 'all expired';
	mealPlanner = new MealPlanner(cookBook, fridge); 
	actual = mealPlanner.recommendNextMeal();
	assert.equal(actual, 'Order Takeout', test + ':' + (actual == null ? "ok" : actual));

	
	

	ingredientsAsCsv = "";
	ingredientsAsCsv += "bread,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "cheese,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "butter,250,grams,25/12/2016" + "\n";
	ingredientsAsCsv += "peanut butter,250,grams,2/12/2016" + "\n";
	ingredientsAsCsv += "mixed salad,150,grams,26/12/2016";
	errors = fridge.initForCsv(ingredientsAsCsv);
	if (errors != null) {
		alert('Fridge initialisation failed with...\n\n' + errors);
	}
	recipesAsJson = 	[
		         		 	{
		        		 		"name" : "grilled tomato on toast",
		        		 		"ingredients" :	[
		        		 		               	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		               	 	{ "item":"tomato", "amount":"1", "unit":"of"}
		        		 		               	]
		        		 	}
		        		 	,
		        		 	{
		        		 		"name": "liver sandwich",
		        		 		"ingredients":	[
		        		 		              	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		              	 	{ "item":"liver", "amount":"100", "unit":"grams"}
		        		 		              	]
		        		 	}
	        		 	];
	errors = cookBook.initForJson(recipesAsJson);
	if (errors != null) {
		alert('Cook book initialisation failed with...\n\n' + errors);
	}
	test = 'missing ingredients';
	mealPlanner = new MealPlanner(cookBook, fridge); 
	actual = mealPlanner.recommendNextMeal();
	assert.equal(actual, 'Order Takeout', test + ':' + (actual == null ? "ok" : actual));

	
	

	ingredientsAsCsv = "";
	ingredientsAsCsv += "bread,1,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "cheese,1,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "butter,25,grams,25/12/2016" + "\n";
	ingredientsAsCsv += "peanut butter,25,grams,2/12/2016" + "\n";
	ingredientsAsCsv += "mixed salad,15,grams,26/12/2016";
	errors = fridge.initForCsv(ingredientsAsCsv);
	if (errors != null) {
		alert('Fridge initialisation failed with...\n\n' + errors);
	}
	recipesAsJson = 	[
		         		 	{
		        		 		"name" : "grilled cheese on toast",
		        		 		"ingredients" :	[
		        		 		               	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		               	 	{ "item":"cheese", "amount":"1", "unit":"of"}
		        		 		               	]
		        		 	}
		        		 	,
		        		 	{
		        		 		"name": "salad sandwich",
		        		 		"ingredients":	[
		        		 		              	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		              	 	{ "item":"mixed salad", "amount":"100", "unit":"grams"}
		        		 		              	]
		        		 	}
	        		 	];
	errors = cookBook.initForJson(recipesAsJson);
	if (errors != null) {
		alert('Cook book initialisation failed with...\n\n' + errors);
	}
	test = 'not enough';
	mealPlanner = new MealPlanner(cookBook, fridge); 
	actual = mealPlanner.recommendNextMeal();
	assert.equal(actual, 'Order Takeout', test + ':' + (actual == null ? "ok" : actual));

	
	

	ingredientsAsCsv = "";
	ingredientsAsCsv += "bread,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "cheese,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "butter,250,grams,25/12/2016" + "\n";
	ingredientsAsCsv += "peanut butter,250,grams,2/12/2016" + "\n";
	ingredientsAsCsv += "mixed salad,150,grams,26/12/2022";
	errors = fridge.initForCsv(ingredientsAsCsv);
	if (errors != null) {
		alert('Fridge initialisation failed with...\n\n' + errors);
	}
	recipesAsJson = 	[
		         		 	{
		        		 		"name" : "grilled cheese on toast",
		        		 		"ingredients" :	[
		        		 		               	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		               	 	{ "item":"cheese", "amount":"2", "unit":"slices"}
		        		 		               	]
		        		 	}
		        		 	,
		        		 	{
		        		 		"name": "salad sandwich",
		        		 		"ingredients":	[
		        		 		              	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		              	 	{ "item":"mixed salad", "amount":"100", "unit":"grams"}
		        		 		              	]
		        		 	}
	        		 	];
	errors = cookBook.initForJson(recipesAsJson);
	if (errors != null) {
		alert('Cook book initialisation failed with...\n\n' + errors);
	}
	test = 'grilled cheese on toast';
	mealPlanner = new MealPlanner(cookBook, fridge); 
	actual = mealPlanner.recommendNextMeal();
	assert.equal(actual, test, test + ':' + (actual == null ? "ok" : actual));

	
	

	ingredientsAsCsv = "";
	ingredientsAsCsv += "bread,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "cheese,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "butter,250,grams,25/12/2016" + "\n";
	ingredientsAsCsv += "peanut butter,250,grams,2/12/2016" + "\n";
	ingredientsAsCsv += "mixed salad,150,grams,25/12/2015";
	errors = fridge.initForCsv(ingredientsAsCsv);
	if (errors != null) {
		alert('Fridge initialisation failed with...\n\n' + errors);
	}
	recipesAsJson = 	[
		         		 	{
		        		 		"name" : "grilled cheese on toast",
		        		 		"ingredients" :	[
		        		 		               	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		               	 	{ "item":"cheese", "amount":"2", "unit":"slices"}
		        		 		               	]
		        		 	}
		        		 	,
		        		 	{
		        		 		"name": "salad sandwich",
		        		 		"ingredients":	[
		        		 		              	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		              	 	{ "item":"mixed salad", "amount":"100", "unit":"grams"}
		        		 		              	]
		        		 	}
	        		 	];
	errors = cookBook.initForJson(recipesAsJson);
	if (errors != null) {
		alert('Cook book initialisation failed with...\n\n' + errors);
	}
	test = 'salad sandwich';
	mealPlanner = new MealPlanner(cookBook, fridge); 
	actual = mealPlanner.recommendNextMeal();
	assert.equal(actual, test, test + ':' + (actual == null ? "ok" : actual));

	
	

	ingredientsAsCsv = "";
	ingredientsAsCsv += "bread,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "cheese,10,slices,25/12/2016" + "\n";
	ingredientsAsCsv += "butter,250,grams,25/12/2016" + "\n";
	ingredientsAsCsv += "peanut butter,250,grams,2/12/2015" + "\n";
	ingredientsAsCsv += "mixed salad,150,grams,25/12/2016";
	errors = fridge.initForCsv(ingredientsAsCsv);
	if (errors != null) {
		alert('Fridge initialisation failed with...\n\n' + errors);
	}
	recipesAsJson = 	[
		         		 	{
		        		 		"name" : "grilled cheese on toast",
		        		 		"ingredients" :	[
		        		 		               	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		               	 	{ "item":"cheese", "amount":"2", "unit":"slices"}
		        		 		               	]
		        		 	}
		        		 	,
		        		 	{
		        		 		"name": "salad sandwich",
		        		 		"ingredients":	[
		        		 		              	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		              	 	{ "item":"mixed salad", "amount":"100", "unit":"grams"}
		        		 		              	]
		        		 	}
		        		 	,
		        		 	{
		        		 		"name": "peanut butter sandwich",
		        		 		"ingredients":	[
		        		 		              	 	{ "item":"bread", "amount":"2", "unit":"slices"},
		        		 		              	 	{ "item":"peanut butter", "amount":"100", "unit":"grams"}
		        		 		              	]
		        		 	}
	        		 	];
	errors = cookBook.initForJson(recipesAsJson);
	if (errors != null) {
		alert('Cook book initialisation failed with...\n\n' + errors);
	}
	test = 'peanut butter sandwich';
	mealPlanner = new MealPlanner(cookBook, fridge); 
	actual = mealPlanner.recommendNextMeal();
	assert.equal(actual, test, test + ':' + (actual == null ? "ok" : actual));
});
