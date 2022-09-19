// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .isLength({ min: 1 })
    .withMessage('First Name is required'),
  check('lastName')
    .isLength({ min: 1 })
    .withMessage('Last Name is required'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  console.log('in signuser', req.body)

  const existedEmail = await User.findOne({
    where: {email: email}
  });

  if (existedEmail) {
    res.status(403)
    res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": ["User with that email already exists"]
    });
  }

  const existedUsername = await User.findOne({
    where: {username: username}
  })

  if (existedUsername) {
    res.status(403)
    res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": ["User with that username already exists"]
    });
  }
  const user = await User.signup({ email, username, password, firstName, lastName });
  console.log('user', user)

  const token = await setTokenCookie(res, user);

  const newUser = user.toJSON();
  newUser.token = token;

  return res.json(newUser);

})


module.exports = router;
