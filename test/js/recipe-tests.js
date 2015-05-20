/*
 * This file contains tests for Recipes. It tests the code in recipe.js. 
 */


QUnit.test('Recipe test - initForJson', function(assert) {
	var recipe = new Recipe(); 
	var actual = null;
	var result = null;
	var test = null;

	test = 'sample';
	var cheeseOnToast = "cheese on toast";
	actual = recipe.initForJson(
									{
										"name":cheeseOnToast,
										"ingredients":	[
										              	 	{"item":"bread", "amount":"2", "unit":"slices"},
										              	 	{"item":"cheese", "amount":"2", "unit":"slices"}
										              	]
									}
								);
	assert.ok(actual == null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(recipe.name, cheeseOnToast, test);
	assert.equal(recipe.ingredients.length, 2, test);
	assert.equal(recipe.ingredients[0].item, 'bread', test);
});
