const bcryptjs = require('bcryptjs');
const passport = require('passport');
const prisma = require('../config/prismaClient');

const signUp = async (req, res) => {
    try {
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
};

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

module.exports = { signUp, logIn, logOut };