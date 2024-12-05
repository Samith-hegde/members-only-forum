const prisma = require('../config/prismaClient');

const viewAllPosts = async (req, res) => {
    try {
        const messages = await prisma.messages.findMany({
            include: {
                user: true
            }
        });
        res.render('posts', { title: 'Messages', messages, user: req.user });
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
}

const deletePost = async (req, res) => {
    try {
        if (!req.body.messageId) {
            res.send('No message ID provided!');
            return;
        }

        const message = await prisma.messages.delete({
            where: {
                messageId: parseInt(req.body.messageId)
            }
        });
        res.redirect('/posts');
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
}

module.exports = { viewAllPosts, deletePost };