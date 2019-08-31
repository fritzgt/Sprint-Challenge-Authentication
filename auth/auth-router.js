const router = require('express').Router();

//connection to db
const db = require('../model/users-model');

//importing bcrypt to hash user password during registration
const bcrypt = require('bcryptjs');

//importing jwt to create token during login
const jwt = require('jsonwebtoken');
//importing the secret file for token
const secrets = require('../config/secrets')

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

router.post('/login', async (req, res) => {
  // implement login
  //deconstruct body
  let { username, password } = req.body;

  try {
    const user = await db.findByUser(username);
    //IF the is a user and the coparison of the passwords match
    //then user is authenticated
    if ((user, bcrypt.compareSync(password, user.password))) {
      //using a function to generate token
      token = genToken(user);
      //for testing, pass token with message to copy ad put in headers
      res.status(200).json({ message: `Welcome ${username}`, token });
      //if there is no use or the creds are incorrect then show error
    } else {
      res.status(400).json({ message: 'Invalid credentials!' });
    }
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

//creating genToken function
function genToken(user){
  const payload ={
    subject = user.id,
    username = user.username
  }
  const options = {
    expiresIn: '1d'
  }
//Generating token
return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
