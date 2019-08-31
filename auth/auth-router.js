const router = require('express').Router();

//connection to db
const db = require('../model/users-model');

//importing bcrypt to hash user password
const bcrypt = require('bcryptjs');

//REGISTER user
router.post('/register', async (req, res) => {
  //get the credentials being pass in the body
  const creds = req.body;
  //passing password to bcrypt to hash it
  const hash = bcrypt.hashSync(creds.password, 14);
  //setting the password equal to the hash version
  creds.password = hash;
  try {
    const user = await db.add(creds);
    res.status(201).json({ message: 'Registration successeful!' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
