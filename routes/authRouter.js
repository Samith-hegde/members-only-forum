const express = require('express');
const router = express.Router();
const { index, signUpForm, signUp, logIn, logOut } = require('../controllers/authController'); 

router.get('/', index);
router.get('/signUp', signUpForm);
router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.get('/logOut', logOut);

module.exports = router;