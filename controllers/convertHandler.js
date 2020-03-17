/*
*
*
*       Complete the handler logic below
*       
*       
*/

const impUnits = ['gal', 'lbs', 'mi'];
const metUnits = ['L', 'kg', 'km'];

function ConvertHandler() {
  
  /**
   * Returns the number from the given input.
   * 
   * @param input The input string
   * @returns The parsed number. If the number is not specified, returns 1. If number is specified but is invalid, returns null.
   *  */ 
  this.getNum = function(input) {
    const index = input.split('').findIndex(char => isLetter(char));
    let numberStr = index === -1 ? input : input.slice(0, index);
    
    if (numberStr.length === 0 ) return 1;
    
    const split = numberStr.split('/');
    if (split.length > 2) return null;    
    // Check if does not contain valid numbers
    if (split.some(item => isNaN(item))) return null;

    return split.map(Number).reduce((a, b) => a / b);
  };
  
  /**
   * Returns the unit from the given input.
   * 
   * @param input The input string
   * @returns The unit. If its invalid or not mentioned, returns null.
   *  */ 
  this.getUnit = function(input) {
    const index = input.split('').findIndex(char => isLetter(char));
    if (index === -1) return null;
    const unit = input.slice(index);
    if (impUnits.map(item => item.toLowerCase()).includes(unit.toLowerCase())
    || metUnits.map(item => item.toLowerCase()).includes(unit.toLowerCase())) {
      return unit;
    }
    return null;
  };
  
  /**
   * Returns the corresponding unit (imperial to metric or vice versa).
   * 
   * @param initUnit The input unit
   * @returns The corresponding output unit. If input unit is invalid, returns null.
   */
  this.getReturnUnit = function(initUnit) {
    let index = impUnits.map(unit => unit.toLowerCase()).indexOf(initUnit.toLowerCase());
    if (index !== -1) {
      return metUnits[index];
    }
    index = metUnits.map(unit => unit.toLowerCase()).indexOf(initUnit.toLowerCase());
    if (index !== -1) {
      return impUnits[index];
    }
    return null;
  };

  /** 
   * Returns the complete string of a unit
   * 
   * @param unit The unit's shorthand
   * @returns The unit's full text
   */
  this.spellOutUnit = function(unit) {
    switch(unit.toLowerCase()) {
      case 'gal': return 'gallon(s)';
      case 'lbs': return 'pound(s)';
      case 'mi': return 'mile(s)';
      case 'l': return 'litre(s)';
      case 'kg': return 'kilogram(s)';
      case 'km': return 'kilometre(s)';
    }
    return null;
  };
  
  /**
   * Converts a value into its corresponding value in other system i.e. metric to imperial or vice versa.
   * 
   * @param initNum The input value
   * @param initUnit The unit of the input value
   * @returns the value after conversion to other system
   * 
   */
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit.toLowerCase()) {
      case 'gal': return initNum * galToL;
      case 'lbs': return initNum * lbsToKg;
      case 'mi': return initNum * miToKm;
      case 'l': return initNum / galToL;
      case 'kg': return initNum / lbsToKg;
      case 'km': return initNum / miToKm;
    }
    return null;
  };
  
  /**
   * Returns a output response of a conversion in the form of an object
   * 
   * @param initNum the input value
   * @param initNum the unit of the input value
   * @param returnNum the converted value
   * @param returnUnit the unit of the converted value
   * @returns The output object
   */
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const string = `${initNum} ${spellOutUnit(initUnit)} converts to ${returnNum} ${spellOutUnit(returnUnit)}`;
    return { initNum, initUnit, returnNum, returnUnit, string };
  };
  
}

/** Check if character is a letter (upper or lower case) */
const isLetter = char => /[a-zA-Z]/.test(char);

module.exports = ConvertHandler;
