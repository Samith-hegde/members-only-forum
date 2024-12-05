const prisma = require('../config/prismaClient');

const viewAllPosts = async (req, res) => {
    try {
        const messages = await prisma.messages.findMany({
            include: {
                user: true,
                category: true,
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
        const { messageId } = req.body;
        const message = await prisma.messages.delete({
            where: {
                messageId: parseInt(messageId)
            }
        });
        res.redirect('/posts');
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
}

module.exports = { viewAllPosts, deletePost };