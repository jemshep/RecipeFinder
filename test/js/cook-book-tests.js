/*
 * This file contains tests for Cook Books. It tests the code in cook-book.js. 
 */


QUnit.test('CookBook test - initForJson', function(assert) {
	var cookBook = new CookBook(); 
	var actual = null;
	var result = null;
	var test = null;

	test = 'sample';
	var cheeseOnToast = "cheese on toast";
	var saladSandwich = "salad sandwich";
	var json = 	[
					{
						"name":cheeseOnToast,
						"ingredients":	[
						              	 	{"item":"bread", "amount":"2", "unit":"slices"},
						              	 	{"item":"cheese", "amount":"2", "unit":"slices"}
						              	]
					},
					{
						"name":saladSandwich,
						"ingredients":	[
						              	 	{"item":"bread", "amount":"2", "unit":"slices"},
						              	 	{"item":"mixed salad", "amount":"100", "unit":"grams"}
						              	]
					}
				];
	actual = cookBook.initForJson(json);
	assert.ok(actual == null, test + ':' + (actual == null ? "ok" : actual));
	//alert(cookBook.toCsv());
	assert.equal(cookBook.recipes.length, 2, test);
	assert.equal(cookBook.recipes[0].name, cheeseOnToast, test);
	assert.equal(cookBook.recipes[1].name, saladSandwich, test);
	assert.equal(cookBook.recipes[0].ingredients.length, 2, test);
	assert.equal(cookBook.recipes[1].ingredients.length, 2, test);
	assert.equal(cookBook.recipes[0].ingredients[0].item, 'bread', test);
	assert.equal(cookBook.recipes[0].ingredients[1].item, 'cheese', test);
	assert.equal(cookBook.recipes[1].ingredients[0].item, 'bread', test);
	assert.equal(cookBook.recipes[1].ingredients[1].item, 'mixed salad', test);
	assert.equal(cookBook.recipes[0].ingredients[0].amount, 2, test);
	assert.equal(cookBook.recipes[0].ingredients[1].amount, 2, test);
	assert.equal(cookBook.recipes[1].ingredients[0].amount, 2, test);
	assert.equal(cookBook.recipes[1].ingredients[1].amount, 100, test);
	assert.equal(cookBook.recipes[0].ingredients[0].unit, 'slices', test);
	assert.equal(cookBook.recipes[0].ingredients[1].unit, 'slices', test);
	assert.equal(cookBook.recipes[1].ingredients[0].unit, 'slices', test);
	assert.equal(cookBook.recipes[1].ingredients[1].unit, 'grams', test);
});
