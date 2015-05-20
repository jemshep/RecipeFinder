/*
 * This file contains tests for Fridges. It tests the code in fridge.js. 
 */


QUnit.test('Fridge test - cleanFridge', function(assert) {
	var fridge = new Fridge(); 
	var test = null;
	var thePast = new Date();
	thePast.setFullYear(1999, 1, 1);
	var theFuture = new Date();
	theFuture.setFullYear(2200, 1, 1);

	fridge.ingredients =	[
	                    	 	{"item":"bread", "amount":"2", "unit":"slices", "expiryDate":thePast},
			        		 	{"item":"cheese", "amount":"2", "unit":"slices", "expiryDate":thePast}
	                    	];
	test = 'both expired';
	fridge.cleanFridge(null);
	assert.equal(fridge.ingredients.length, 0);

	fridge.ingredients =	[
	                    	 	{"item":"bread", "amount":"2", "unit":"slices", "expiryDate":theFuture},
			        		 	{"item":"cheese", "amount":"2", "unit":"slices", "expiryDate":thePast}
	                    	];
	test = 'cheese expired';
	fridge.cleanFridge(null);
	assert.equal(fridge.ingredients.length, 1);
	assert.equal(fridge.ingredients[0].item, 'bread');

	fridge.ingredients =	[
	                    	 	{"item":"bread", "amount":"2", "unit":"slices", "expiryDate":thePast},
			        		 	{"item":"cheese", "amount":"2", "unit":"slices", "expiryDate":theFuture}
	                    	];
	test = 'bread expired';
	fridge.cleanFridge(null);
	assert.equal(fridge.ingredients.length, 1);
	assert.equal(fridge.ingredients[0].item, 'cheese');

	fridge.ingredients =	[
	                    	 	{"item":"bread", "amount":"2", "unit":"slices", "expiryDate":theFuture},
			        		 	{"item":"cheese", "amount":"2", "unit":"slices", "expiryDate":theFuture}
	                    	];
	test = 'both OK';
	fridge.cleanFridge(null);
	assert.equal(fridge.ingredients.length, 2);
	assert.equal(fridge.ingredients[0].item, 'bread');
	assert.equal(fridge.ingredients[1].item, 'cheese');
});


QUnit.test('Fridge test - getIngredientByItemName', function(assert) {
	var fridge = new Fridge(); 
	var actual = null;
	var result = null;
	var test = null;
	var breadDate = new Date();
	var cheeseDate = new Date();
	
	breadDate.setFullYear(2014, 10, 2);
	cheeseDate.setFullYear(2015, 4, 12);
	fridge.ingredients =	[
	                    	 	{"item":"bread", "amount":"2", "unit":"slices", "expiryDate":breadDate},
			        		 	{"item":"cheese", "amount":"2", "unit":"slices", "expiryDate":cheeseDate}
	                    	];
	test = 'null';
	actual = fridge.getIngredientByItemName(null);
	assert.ok(actual == null, test + ':' + (actual == null ? "ok" : actual));

	test = 'empty string';
	actual = fridge.getIngredientByItemName('');
	assert.ok(actual == null, test + ':' + (actual == null ? "ok" : actual));

	test = 'not found';
	actual = fridge.getIngredientByItemName('anything');
	assert.ok(actual == null, test + ':' + (actual == null ? "ok" : actual.amount));

	test = 'Found bread';
	actual = fridge.getIngredientByItemName('bread');
	assert.ok(actual != null, test + ':' + (actual != null ? "ok" : actual.item));
	assert.equal(actual.amount, 2);
	assert.equal(actual.unit, 'slices');
	assert.equal(actual.expiryDate.toString(), breadDate.toString());

	test = 'Found cheese';
	actual = fridge.getIngredientByItemName('cheese');
	assert.ok(actual != null, test + ':' + (actual != null ? "ok" : actual.item));
	assert.equal(actual.amount, 2);
	assert.equal(actual.unit, 'slices');
	assert.equal(actual.expiryDate.toString(), cheeseDate.toString());
});


QUnit.test('Fridge test - initForCsv', function(assert) {
	var fridge = new Fridge(); 
	var actual = null;
	var result = null;
	var test = null;
	var breadDate = new Date();
	var cheeseDate = new Date();

	test = 'null';
	actual = fridge.initForCsv(null);
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	
	test = 'empty string';
	actual = fridge.initForCsv('');
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));

	var csv = null;
	breadDate.setFullYear(2014, 10, 2);
	cheeseDate.setFullYear(2015, 4, 12);

	test = '1 item';
	csv = 'bread,2,slices,2/11/2014';
	actual = fridge.initForCsv(csv);
	assert.ok(actual == null, test + ':' + (actual != null ? "ok" : actual));
	assert.equal(fridge.ingredients.length, 1, 'records');
	assert.equal(fridge.ingredients[0].toCsv(), csv);

	test = '2 items';
	csv = 'bread,2,slices,2/11/2014' + '\n' + 'cheese,2,slices,12/5/2015';
	actual = fridge.initForCsv(csv);
	assert.ok(actual == null, test + ':' + (actual != null ? "ok" : actual));
	assert.equal(fridge.ingredients.length, 2, test);
	assert.equal(fridge.ingredients[0].toCsv() + '\n' + fridge.ingredients[1].toCsv(), csv);
});
