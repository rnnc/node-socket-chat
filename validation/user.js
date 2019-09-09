const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports.validateRegisterInput = (data) => {

  let errors = {};

  // ensure object types exist
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  const { username, email, password, password2 } = data;

  if (Validator.isEmpty(username))
    errors.username = 'Username field is required';

  if (Validator.isEmail(email))
    errors.email = 'Email is invalid';

  if (!Validator.isLength(password, { min: 3, max: 20 }))
    errors.password = 'Password should be between 3 & 20 characters';

  if (!Validator.equals(password, password2))
    errors.password2 = 'Password & Password Confirmation must match';

  if (Validator.isEmpty(password))
    errors.password = 'Password is required';

  if (Validator.isEmpty(password2))
    errors.password2 = 'Password Confirmation is required';

  return {
    errors,
    isValid: isEmpty(errors)
  }

}

module.exports.validateLoginInput = (data) => {

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