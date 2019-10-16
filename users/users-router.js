const router = require('express').Router();

const Users = require('./users.model.js');

// Import Restricted MW
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            if(users) {
            res.status(200).json({ loggedInUser: req.username, users })
          } else {
            res.status(401).json({ message: "You shall not pass." })
          }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an issue with that request." })
        })
})

module.exports = router;
