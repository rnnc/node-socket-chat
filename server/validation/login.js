const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = (data) => {

  let errors = {};

  //ensure objects exist
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username))
    errors.email = 'Username is required';


  if (!Validator.isLength(data.password, { min: 3, max: 20 }))
    errors.password = 'Password must have 6 chars';


  if (Validator.isEmpty(data.password))
    errors.password = 'Password is required';


  return {
    errors,
    isValid: isEmpty(errors)
  }
}