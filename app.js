const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const authRouter = require('./routes/authRouter');
const newPostRouter = require('./routes/newPostRouter');
const postsRouter = require('./routes/postsRouter');
const clubMemberRouter = require('./routes/clubMemberRouter');

app.use('/newPost', newPostRouter);
app.use('/clubMember', clubMemberRouter);
app.use('/posts', postsRouter);
app.use('/', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});