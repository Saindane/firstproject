var express = require('express');
var app = express();
var expressValidator = require('express-validator');
var router = require('./router.js');
var util = require('util');
app.use(express.json());



const validatorOptions = {
    //In that custom validation is provided
    customValidators: {
        greaterThanOrEqual: (inputParam, minValue) => {
            return inputParam >= minValue;
        },
        lessThanOrEqual: (inputParam, minValue) => {
            return inputParam <= minValue;
        }
    },
    customSanitizers: {
        //In that customSanitizer is provided
        convertToupperCase: (inputString) => {
            let uppercaseString = inputString.toUpperCase();
            return uppercaseString;
        }
    }
};
app.use(expressValidator(validatorOptions));
app.use('/api', router);

app.listen(3000, function() {
    console.log("Live at Port 3000");
});