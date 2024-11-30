const prisma = require('../config/prismaClient');

const newPostForm = (req, res) => {
    res.render('newPost', { title: 'New Post', user: req.user });
};

const createPost = async (req, res) => {
    try {
        const post = await prisma.messages.create(
            {
                data: {
                    title: req.body.title,
                    textContent: req.body.textContent,
                    userId: req.user.userId
                }
            }
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
}

module.exports = { newPostForm, createPost };