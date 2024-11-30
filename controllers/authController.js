const bcryptjs = require('bcryptjs');
const passport = require('passport');
const pool = require('../config/database');

const signUp = async (req, res) => {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);

        const query = "INSERT INTO users (email, username, firstName, lastName, password) VALUES ($1, $2, $3, $4, $5)";

        await pool.query(query,
            [req.body.email, req.body.username, req.body.firstName, req.body.lastName, hashedPassword]);
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

const logOut = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = { signUp, logIn, logOut };