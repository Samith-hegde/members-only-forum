const bcryptjs = require('bcryptjs');
const passport = require('passport');
const prisma = require('../config/prismaClient');
const { body, validationResult } = require('express-validator');

const validateNewUser = [
    body('username').trim()
        .isLength({ min: 1 }).withMessage('Username must not be empty.')
        .isLength({ max: 25 }).withMessage('Username must not be more than 25 characters long.')
        .isAlphanumeric().withMessage('Username must be alphanumeric.'),
    body('email').trim()
        .isEmail().withMessage('Please provide a valid email address.'),
    body('password').trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.'),
]

const index = (req, res) => {
    res.render('index', { title: 'Members-only Forum', user: req.user });
};

const signUpForm = (req, res) => {
    res.render('signUp', { title: 'Sign Up', errors: [] });
};

const signUp = [
    validateNewUser,
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('signUp', { title: 'Sign Up', errors: errors.array() });
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const user = await prisma.users.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
}];

const logIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
});

const logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
    }});
    res.redirect('/');
}

module.exports = { index, signUpForm, signUp, logIn, logOut };