const router = require('express').Router();

const Users = require('./users.model.js');

// Import Restricted MW
const mw = require('../auth/restricted-middleware.js');

// restricted mw required
router.get('/', mw, (req, res) => {
    Users.find()
        .then(users => {
            if(users) {
            console.log(users)
            users.map(u => {
              const { id, username } = u;
              res.status(200).json({id, username})
            })             
          } else {
            res.status(401).json({ message: "You shall not pass." })
          }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an issue with that request." })
        })
});

module.exports = router;
