const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signUp, logIn, logOut } = require('../controllers/authController'); 

router.get('/signUp', (req, res) => {
    res.render('signUp');
});

router.post('/signUp', signUp);

router.post('/logIn', logIn);

router.get('/logOut', logOut);

module.exports = router;