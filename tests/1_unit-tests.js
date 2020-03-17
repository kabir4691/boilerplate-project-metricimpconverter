/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      assert.equal(convertHandler.getNum('13.5L'), 13.5);
      done();
    });
    
    test('Fractional Input', function(done) {
      assert.equal(convertHandler.getNum('1/4'), 0.25);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      assert.equal(convertHandler.getNum('1/2.5'), 0.4);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      assert.equal(convertHandler.getNum('1/2/3'), null);
      done();
    });
    
    test('No Numerical Input', function(done) {
      assert.equal(convertHandler.getNum('kg'), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var inputs = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      inputs.forEach(item => {
        assert.isNotNull(convertHandler.getUnit(item), `${item} getUnit is null`);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.isNull(convertHandler.getUnit('second'));
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const inputs = ['gal','lbs','mi','L','kg','km'];
      const expect = ['gallon(s)','pound(s)','mile(s)','litre(s)', 'kilogram(s)','kilometre(s)'];
      inputs.forEach((item, index) => {
        assert.equal(convertHandler.spellOutUnit(item), expect[index]);
      });
      done();
    });
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [3, 'l'];
      const expect = 0.79;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1)
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [4, 'mi'];
      const expect = 6.43;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1)
      done();
    });
    
    test('Km to Mi', function(done) {
      const input = [7, 'km'];
      const expect = 4.34;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1)
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const input = [12, 'lbs'];
      const expect = 5.44;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1)
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [6, 'kg'];
      const expect = 13.22;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1)
      done();
    });
    
  });

});