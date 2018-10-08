var express = require('express');
var router = express.Router();
var util = require('util');

//This is checking validation related QueryParameter
router.get('/test_validator', (request, response, next) => {
    request.checkQuery('page', '"page" must be Int,not empty').notEmpty().isInt().greaterThanOrEqual(0);
    request.checkQuery('limit', '"limit" must be Int,not empty').notEmpty().isInt().lessThanOrEqual(10);
    request.sanitize('address').convertToupperCase();
    request.getValidationResult().then((validationResult) => {
        if (!validationResult.isEmpty()) {
            response.json({
                result: "failed",
                messege: `validation Error ${util.inspect(validationResult.array())}`
            });
            return;
        }
        response.json({
            result: "ok",
            messege: `validation input successfully ${util.inspect(request.query)}`
        });
    });

})

//This is checking validation related requestBody
router.post('/test_validator', (request, response, next) => {
    request.checkBody('email', '"email" isnot correct form').notEmpty().isEmail();
    request.getValidationResult().then((validationResult) => {
        if (!validationResult.isEmpty()) {
            response.json({
                result: "failed",
                messege: `validation Error ${util.inspect(validationResult.array())}`
            });
            return;
        }
        response.json({
            result: "ok",
            messege: `validation input successfully ${util.inspect(request.body)}`
        });
    });

})

module.exports = router;