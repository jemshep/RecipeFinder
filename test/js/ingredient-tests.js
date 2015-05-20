/*
 * This file contains tests for Ingredients. It tests the code in ingredient.js. 
 */


QUnit.test('Ingredient test - validateExpiryDate', function(assert) {
	var ingredient = new Ingredient(); 
	var testDate = null;
	var actual = null;
	
	// Test the validation picks up invalid date formats.
	testDate = 'sffhjjewgftemncb';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual != null, 'Goobldeygook: ' + actual);
	
	testDate = '05/15';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual != null, 'No day: ' + actual);
	
	testDate = '19-05-2015';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual != null, 'Wrong separators: ' + actual);
	
	testDate = '2015/01/01';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual != null, 'Year 1st: ' + actual);
	
	testDate = '19/05/15';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual != null, '2 digit year: ' + actual);
	
	testDate = '19/123/2015';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual != null, 'month too big: ' + actual);
	
	
	// Test the validation picks up valid date formats.
	testDate = '01/01/2011';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual == null, 'First of the first: ' + actual);

	testDate = '01/01/2033';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual == null, 'Far future: ' + actual);

	testDate = '21/05/2015';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual == null, 'Now-ish: ' + actual);
	
	testDate = '1/11/2015';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual == null, '1 digit day: ' + actual);
	
	testDate = '19/5/2015';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual == null, '1 digit month: ' + actual);
	
	testDate = '9/5/2015';
	actual = ingredient.validateExpiryDate(testDate);
	assert.ok(actual == null, '1 digit day and month: ' + actual);
});


QUnit.test('Ingredient test - getExpiryDate', function(assert) {
	var ingredient = new Ingredient(); 
	var testDate = new Date();
	var testDateString = '';
	var actual = new Date();

	actual = ingredient.getExpiryDateFromString(null);
	assert.equal(null, null, 'null');

	testDate.setFullYear(2015, 4, 22);
	testDateString = '22/5/2015';
	actual = ingredient.getExpiryDateFromString(testDateString);
	assert.equal(actual.toString(), testDate.toString(), 'Single digit month (' + testDate + ') ' + testDate);
});


QUnit.test('Ingredient test - validateAmount', function(assert) {
	var ingredient = new Ingredient(); 
	var actual = null;
	var result = null;

	actual = ingredient.validateAmount(null);
	assert.ok(actual != null, 'null:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateAmount('text');
	assert.ok(actual != null, 'text:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateAmount('');
	assert.ok(actual != null, 'empty string:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateAmount('0');
	assert.ok(actual != null, 'zero:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateAmount('0.6');
	assert.ok(actual != null, 'decimal:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateAmount('999.1');
	assert.ok(actual != null, 'big decimal:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateAmount('1');
	assert.ok(actual == null, '1:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateAmount('11');
	assert.ok(actual == null, '11:' + (actual == null ? "ok" : actual));
});


QUnit.test('Ingredient test - validateUnit', function(assert) {
	var ingredient = new Ingredient(); 
	var actual = null;

	actual = ingredient.validateUnit(null);
	assert.ok(actual != null, 'null:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateUnit('');
	assert.ok(actual != null, 'empty string:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateUnit('rubbish');
	assert.ok(actual != null, 'Rubbish:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateUnit('of');
	assert.ok(actual == null, 'of:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateUnit('grams');
	assert.ok(actual == null, 'grams:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateUnit('slices');
	assert.ok(actual == null, 'slices:' + (actual == null ? "ok" : actual));

	actual = ingredient.validateUnit('ml');
	assert.ok(actual == null, 'ml:' + (actual == null ? "ok" : actual));
});


QUnit.test('Ingredient test - initForCsv', function(assert) {
	var ingredient = new Ingredient(); 
	var actual = null;
	var result = null;
	var test = null;

	test = 'null';
	actual = ingredient.initForCsv(null);
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, null, test);
	assert.equal(ingredient.amount, null, test);
	assert.equal(ingredient.unit, null, test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'mumbo-jumbo';
	actual = ingredient.initForCsv('mumbo,jumbo');
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, null, test);
	assert.equal(ingredient.amount, null, test);
	assert.equal(ingredient.unit, null, test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'just items';
	actual = ingredient.initForCsv('bread,pasta,rice');
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, null, test);
	assert.equal(ingredient.amount, null, test);
	assert.equal(ingredient.unit, null, test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'bad amount';
	actual = ingredient.initForCsv('bread,pasta,grams,hello');
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, null, test);
	assert.equal(ingredient.amount, null, test);
	assert.equal(ingredient.unit, null, test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'bad unit';
	actual = ingredient.initForCsv('bread,2,hello');
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, null, test);
	assert.equal(ingredient.amount, null, test);
	assert.equal(ingredient.unit, null, test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'bad date';
	actual = ingredient.initForCsv('bread,2,slices,hello');
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, null, test);
	assert.equal(ingredient.amount, null, test);
	assert.equal(ingredient.unit, null, test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'No expiry';
	actual = ingredient.initForCsv('bread,2,slices');
	assert.ok(actual == null, test + ':' + (actual != null ? "ok" : actual));
	assert.equal(ingredient.item, 'bread', test);
	assert.equal(ingredient.amount, 2, test);
	assert.equal(ingredient.unit, 'slices', test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'With expiry';
	actual = ingredient.initForCsv('bread,2,slices,12/12/2014');
	assert.ok(actual == null, test + ':' + (actual != null ? "ok" : actual));
	assert.equal(ingredient.item, 'bread', test);
	assert.equal(ingredient.amount, 2, test);
	assert.equal(ingredient.unit, 'slices', test);
	assert.equal(ingredient.expiryDate.toString(), ingredient.getExpiryDateFromString('12/12/2014').toString(), test);

});


QUnit.test('Ingredient test - initForJson', function(assert) {
	var ingredient = new Ingredient(); 
	var actual = null;
	var result = null;
	var test = null;

	test = 'null';
	actual = ingredient.initForJson(null);
	assert.ok(actual != null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, null, test);
	assert.equal(ingredient.amount, null, test);
	assert.equal(ingredient.unit, null, test);
	assert.equal(ingredient.expiryDate, null, test);

	test = 'sample';
	actual = ingredient.initForJson({"item":"bread", "amount":"2", "unit":"slices"});
	assert.ok(actual == null, test + ':' + (actual == null ? "ok" : actual));
	assert.equal(ingredient.item, 'bread', test);
	assert.equal(ingredient.amount, 2, test);
	assert.equal(ingredient.unit, 'slices', test);
	assert.equal(ingredient.expiryDate, null, test);
});


QUnit.test('Ingredient test - toCsv', function(assert) {
	var ingredient = new Ingredient(); 
	var actual = null;
	var test = null;
	var csv = null;
	
	test = 'null';
	csv = '';
	ingredient.initForCsv(csv);
	actual = ingredient.toCsv(); 
	assert.equal(actual, csv, test + ':' + (actual == null ? "ok" : actual));
	
	test = 'empty string';
	csv = '';
	ingredient.initForCsv(csv);
	actual = ingredient.toCsv(); 
	assert.equal(actual, csv, test + ':' + (actual == null ? "ok" : actual));
	
	test = 'bread';
	csv = 'bread,2,slices,2/12/2014';
	ingredient.initForCsv(csv);
	actual = ingredient.toCsv(); 
	assert.equal(actual, csv, test + ':' + (actual == null ? "ok" : actual));
	
	test = 'another date';
	csv = 'bread,2,slices,12/5/2015';
	ingredient.initForCsv(csv);
	actual = ingredient.toCsv(); 
	assert.equal(actual, csv, test + ':' + (actual == null ? "ok" : actual));
});
