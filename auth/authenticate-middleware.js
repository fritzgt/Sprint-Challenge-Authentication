/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

//importing jwt to create token during login
const jwt = require('jsonwebtoken');
//importing the secret file for token
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  //getting token from headers
  const token = req.headers.authorization;
  //if a token exist it will decoded
  if (token) {
    //decoding token
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      //if there is an error, means that the token
      // is invalid or has been tempered
      if (err) {
        res.status(401).json({ message: 'invalid token!' });
        //else it is valid so will will continue normal process
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Missing token!' });
  }
};
