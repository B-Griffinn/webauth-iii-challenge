// Imports needed - router, bcrypt, jwt
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Users model required + secrets (after created)
const Users = require('../users/users.model.js');
const secrets = require('../config/secrets.js');


// Begin endpoints - register, login, logout

router.post('/register', (req, res) => {
    let user = req.body; // << bring in the entire body from the req

    const hash = bcrypt.hashSync(user.password, 8) // << create a constant that will hash our password from the user

    user.password = hash; // << set the password to the hash so the DB never sees the real password

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json({ messag: "There was an error registering. Try again." })
        });
});
// END REGISTRTION 


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username }) // look in our DB for the username provided
        .first() // << the first one to match, unique usernames only so there are no dupes
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                // if all true create a JWT
                const token = generateToken(user);
                // add that token to response
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials." })
            }
        })
        .catch( err => {
            res.status(500).json({ message: "There was a server error when logging in." })
        })
});
// END LOGIN 


// Create a function that generates a JWtoken
function generateToken(user) {
    //1. Create a payload
    const payload = {
        username: user.username,
        subject: user.id
    };
    
    //2 create a secret 
    // made dynamic in our config file 

    //3 create options
    const options = {
        expiresIn: '1h' // < adds a claim of the expiration time
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

//ALWAYS EXPORT
module.exports = router;
