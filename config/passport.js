const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const pool = require('./database');
const prisma = require('./prismaClient');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                  username: username, // or just `username` in shorthand
                },
              });              

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const passwordMatch = await bcryptjs.compare(password, user.password);
            if (!passwordMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await prisma.users.findUnique({
            where: { userId: userId }
        });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;