const router = require('express').Router();

const Users = require('./users.model.js');

// Import Restricted MW
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json({ loggedInUser: req.username, users })
        })
        .catch(err => res.send(err))
})

module.exports = router;
