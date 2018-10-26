const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateTaskInput = data => {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';

    if (!Validator.isLength(data.title, { min: 1, max: 30 })) {
        errors.title = 'Title must have 6 chars';
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}