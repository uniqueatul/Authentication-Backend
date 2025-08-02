
const express = require('express');
const router = express.Router();    


// Import user controller
const {login , singup} = require('../controllers/Auth');

// User login route
router.post('/login', login);
// User signup route
router.post('/signup', singup);

module.exports = router;
