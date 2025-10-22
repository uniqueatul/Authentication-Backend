
const express = require('express');
const router = express.Router();    


// Import user controller
const {login , singup} = require('../controllers/Auth');



// router.post('/login', login);
router.post('/signup', singup);

module.exports = router;
