const BaseError = require('./baseError');

class ValidationError extends BaseError {
    status = 400;
}

module.exports = ValidationError;