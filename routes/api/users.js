const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validateLoginInput, validateRegisterInput } = require('../../validation/user')
const { User } = require('../../models/mongoSchema');

module.exports.registerUser = async (userObj) => {

  const { errors, isValid } = validateRegisterInput(userObj);

  if (!isValid)
    throw errors;

  const { username, email, password } = userObj;

  const user = await User.findOne({ username });

  if (user) {
    errors.username = 'Username already exists';
    reject(errors);
  }

  const newUser = new User({
    username,
    email,
    password: await encryptPassword(password)
  });

  await newUser.save();

  return signJWT({ id: newUser.id, username: newUser.username });

}


module.exports.loginUser = async (userObj) => {

  console.log('login working')

  const { errors, isValid } = validateLoginInput(userObj);

  if (!isValid)
    throw errors;

  const { username, password } = userObj;

  const user = await User.findOne({ username });

  if (!user) {
    errors.username = 'User not found';
    throw errors;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch)
    return signJWT({ id: user.id, username: user.username })

  errors.password = 'Invalid Password'
  throw errors;
}


function signJWT(payload, expiresIn = '1d') {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}


async function encryptPassword(password) {

  const salt = await bcrypt.genSalt(10);

  try {
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw { message: "Password hash gen failed", error }
  }
}
