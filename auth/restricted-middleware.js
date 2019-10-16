// Imports required - jsonwebtoken, secrets
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

// export the middleware
module.exports = (req, res, next) => {
    // 1 create token for headers.auth
    const token = req.headers.authorization; // < client sends here

    if(token) {
          // check that the token is valid
      // async needs a cb
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if(err) {
              // foul play
              res.status(401).json({ message: "Invalid Credentials!" })
          } else {
              // token is good
              res.username = decodedToken.username;
              next();
          }
      })
    } else {
        res.status(400).json({ message: "No credentials provided." })
    }
};
