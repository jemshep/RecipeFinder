/*
 * This file encapsulates an ingredient. An ingredient consists of:
 * 
 * 		an item, an amount, a unit and an expiry date.
 * 
 * These parts can be retrieved after construction via getters.
 * 
 * An ingredient is defined as a CSV matching the example following...
 * 
 * 		"bread,10,slices,25/12/2014"
 * 
 * Usage:
 *
 *		// Define parts of the ingredient as CSV.
 *		var ingredientPartsAsCsv = "bread,10,slices,25/12/2014";
 *		// Create an Ingredient object.
 *		var ingredient = new Ingredient();
 * 		// Initialise the object to the values in the CSV of ingredients and check for errors.
 * 		var errors = ingredient.initForCsv(ingredientPartsAsCsv);
 * 		// See if the ingredient CSV is valid.
 * 		if (errors == null) {
 * 			// Get the ingredient's expiry date.
 * 			var expiryDate = ingredient.getExiryDate();
 * 			...
 * 		} else {
 * 			alert(errors);
 * 		}
 * 		// Note that you can also initialise an Ingredient object passing JSON...
 * 		errors = ingredient.initForJson(ingredientAsJson);
 * 
 * Valid values for units are defined in ingredient.validUnits which is an array of strings.
 */

function Ingredient() {
	this.item = null;
	this.amount = null;
	this.unit = null;
	this.expiryDate = null;
}

Ingredient.prototype = {

	constructor : Ingredient,
	
	// Define the list of valid units that a recipe or ingredient can have.
	validUnits : ['of', 'grams', 'ml', 'slices'],
	
	// Define the regular expression the date format must comply with e.g. 19/5/2015.
	dateFmtRegEx : new RegExp(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/),
	
	// Define the regular expression the amount must comply with e.g. 11.
	amountFmtRegEx : new RegExp(/^[1-9]\d*$/),
	
	/*
	 * Initialises the ingredient object according to the parts of the ingredient CSV given.
	 * The format of the parameter given is expected to be like: "bread,10,slices,25/12/2014".
	 * If the parameter is invalid, an error message is returned, otherwise null is returned.
	 */
	initForCsv : function(anIngredient) {
		var errors = null;
		if (anIngredient == null) {
			return "No ingredient CSV. Use this format 'bread,10,slices,25/12/2014'.";
		}
		// Split the ingredient up into its parts using the part separator.
		var ingredientParts = anIngredient.split(',');
		// See if all the parts are there. Note that the expiry date is optional.
		if (ingredientParts.length != 3 && ingredientParts.length != 4) {
			return "Invalid ingredient CSV. Use this format 'bread,10,slices,25/12/2014'.";
		}
		var item = ingredientParts[0];	// What validating can be applied to item?
		var amount = ingredientParts[1]; 
		var unit = ingredientParts[2];
		var expiryDateString = null;
		if (ingredientParts.length == 4) {
			expiryDateString = ingredientParts[3];
		}

		// Validate the amount.
		errors = this.validateAmount(amount);
		if (errors != null) {
			return errors;
		}
		
		// Validate the unit.
		errors = this.validateUnit(unit);
		if (errors != null) {
			return errors;
		}
		
		// Validate the expiry date - if provided.
		if (expiryDateString != null) {
			errors = this.validateExpiryDate(expiryDateString);
			if (errors != null) {
				return errors;
			}
		}
		
		// If there were no errors, set the properties of this instance accordingly.
		this.item = item;
		this.amount = parseInt(amount);
		this.unit = unit;
		this.expiryDate = this.getExpiryDateFromString(expiryDateString);
		return null;
	},
	
	/*
	 * Initialises the ingredient object according to the parts of the ingredient JSON given.
	 * The format of the parameter given is expected to be like:
	 * {"item":"cheese", "amount":"2", "unit":"slices", "expiryDate":"25/12/2014"}
	 * The expiryDate can be omitted. If so, the getExpiryDate() function will return null.
	 * If the parameter is invalid, an error message is returned, otherwise null is returned.
	 */
	initForJson : function(anIngredient) {
		if (anIngredient == null) {
			return 'No ingredient JSON. Use this format {"item":"cheese", "amount":"2", "unit":"slices", "expiryDate":"25/12/2014"}.';
		}
		var errors = null;
		this.item = anIngredient.item;	// How can the item be validated?
		
		// Validate the amount.
		errors = this.validateAmount("" + anIngredient.amount);
		if (errors != null) {
			return errors;
		}
		this.amount = anIngredient.amount;
		
		// Validate the unit.
		errors = this.validateUnit("" + anIngredient.unit);
		if (errors != null) {
			return errors;
		}
		this.unit = anIngredient.unit;
		
		/*
		 *  The only time a JSON is going to be provided is when no expiry date is provided. So we don't need...
		 *  
		 *  // See if an expiry date was provided.
		 *  if ('expiryDate' in anIngredient) {
		 *  	// Validate the expiry date.
		 *  	errors = this.validateExpiryDate("" + anIngredient.expiryDate);
		 *  	this.item = anIngredient.expiryDate;
		 *  }
		 */ 
		
		return null;
	},
	
	/*
	 * Returns an error message if the given ingredient amount is not a positive integer string literal.
	 * Returns null if the ingredient amount is correctly defined.
	 */
	validateAmount : function(amount) {
		// Make sure the amount is a valid positive integer (specification says 'int').
		if (!this.amountFmtRegEx.test(amount)) {
			return "Invalid amount. Amount must be a whole number greater than zero.";
		}
		return null;
	},
	
	/*
	 * Returns an error message if the given ingredient unit is invalid.
	 * See validUnits for a list of valid units.
	 * Returns null if the ingredient unit is valid.
	 */
	validateUnit : function(unit) {
		// Make sure the unit is one of the valid units.
		if ($.inArray(unit, this.validUnits) < 0) {
			return 'Invalid unit of "' + unit + "'. Use one of: " + this.validUnits.toString();
		}
		return null;
	},
	
	/*
	 * Returns an error message if the given expiry date is invalid.
	 * See dateFmtRegEx for the valid date format e.g. '2/12/2014'.
	 * Both day and month can be 1 or 2 digit numbers.
	 * Returns null if the expiry date is valid.
	 */
	validateExpiryDate : function(expiryDate) {
		// Make sure the expiry date is correctly formatted.
		if (!this.dateFmtRegEx.test(expiryDate)) {
			return "Invalid expiry date. Match the format 'dd/mm/yyyy'.";
		}
		return null;
	},

	/*
	 * Returns the date for the given string literal assuming it matches the format 'dd/mm/yyyy'.
	 * Both day and month can be 1 or 2 digit numbers.
	 */
	getExpiryDateFromString : function(expiryDate) {
		if (expiryDate == null) {
			return null;
		}
		// Split the string up by the date component separator.
		var expiryDateParts = expiryDate.split('/');
		// The day is first, convert it from a number.
		var day = parseInt(expiryDateParts[0]);
		// Remember, month indexes start at zero.
		var month = parseInt(expiryDateParts[1]) - 1;
		// And finally get the year.
		var year = parseInt(expiryDateParts[2]);
		// Now build a date object from these elements.
		var dte = new Date();
		dte.setFullYear(year, month, day);
		return dte;
	},
	
	/*
	 * Returns a readable string representation of the properties set within the ingredient.
	 * E.g. "bread,2,slices,12/12/2012".
	 */
	toCsv : function() {
		var result = "";
		// See if there is an item.
		if (this.item != null) {
			// See if we need a separator.
			if (result.length > 0) {
				result += ",";
			}
			result += this.item;
		}
		// See if there is an amount.
		if (this.amount != null) {
			// See if we need a separator.
			if (result.length > 0) {
				result += ",";
			}
			result += this.amount;
		}
		// See if there is a unit.
		if (this.unit != null) {
			// See if we need a separator.
			if (result.length > 0) {
				result += ",";
			}
			result += this.unit;
		}
		// See if there is an expiry date.
		if (this.expiryDate != null) {
			// See if we need a separator.
			if (result.length > 0) {
				result += ",";
			}
			result += this.expiryDate.getDate() + "/"
					+ (this.expiryDate.getMonth() + 1) + "/"
					+ this.expiryDate.getFullYear();
		}
		return result;
	}
	
};
