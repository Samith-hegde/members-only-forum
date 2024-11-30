const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const authRouter = require('./routes/auth');

app.use('/', authRouter);
app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});