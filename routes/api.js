/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const input = req.query.input;
      
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);

      if (initNum === null && initUnit === null) return res.send('invalid number and unit');
      if (initNum === null) return res.send('invalid number');
      if (initUnit === null) return res.send('invalid unit');
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.status(200).json(toString);
    });
    
};
