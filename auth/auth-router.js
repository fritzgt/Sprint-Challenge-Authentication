const router = require('express').Router();

//connection to db
const db = require('../');

//importing bcrypt to hash user password
const bcrypt = require('bcryptjs');

//REGISTER user
router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
