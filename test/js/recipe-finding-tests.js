/*
 * This file contains tests for recipe finding. 
 */

// Test the lowest level functions first.

QUnit.test('validateExpiryDate', function(assert) {
	var testDate = null;
	var actual = null;
	
	// Test the validation picks up invalid date formats.
	testDate = 'sffhjjewgftemncb';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual != null, 'Goobldeygook: ' + actual);
	
	testDate = '05/15';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual != null, 'No day: ' + actual);
	
	testDate = '19-05-2015';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual != null, 'Wrong separators: ' + actual);
	
	testDate = '2015/01/01';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual != null, 'Year 1st: ' + actual);
	
	testDate = '19/05/15';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual != null, '2 digit year: ' + actual);
	
	testDate = '19/123/2015';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual != null, 'month too big: ' + actual);
	
	
	// Test the validation picks up valid date formats.
	testDate = '01/01/2011';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual == null, 'First of the first: ' + actual);

	testDate = '01/01/2033';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual == null, 'Far future: ' + actual);

	testDate = '21/05/2015';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual == null, 'Now-ish: ' + actual);
	
	testDate = '1/11/2015';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual == null, '1 digit day: ' + actual);
	
	testDate = '19/5/2015';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual == null, '1 digit month: ' + actual);
	
	testDate = '9/5/2015';
	actual = recipeFinding.validateExpiryDate(testDate);
	assert.ok(actual == null, '1 digit day and month: ' + actual);
});


QUnit.test('getExpiryDate', function(assert) {
	var testDate = new Date();
	var testDateString = '';
	var actual = new Date();

	testDate.setFullYear(2015, 4, 22);
	testDateString = '22/5/2015';
	actual = recipeFinding.getExpiryDate(testDateString);
	assert.equal(actual, testDate, 'Single digit month (' + testDate + ') ' + testDate);
});
