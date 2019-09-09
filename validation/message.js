const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports.validateMessageInput = (data) => {
  let errors = {};

  data.text = !isEmpty ? data.text : '';

  if (!Validator.isLength(data.text, { min: 1, max: 250 }))
    errors.text = 'Message length must be between 0 & 250 characters';

  if (Validator.isEmpty(data.text))
    errors.text = 'Message is required';

  return {
    errors,
    isValid: isEmpty(errors)
  }

}