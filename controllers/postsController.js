const prisma = require('../config/prismaClient');

const viewAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.search || '';

        const searchCondition = searchQuery ? {
            OR: [
                { title: { contains: searchQuery, mode: 'insensitive' } },
                { textContent: { contains: searchQuery, mode: 'insensitive' } }
            ]
        } : {};

        const messages = await prisma.messages.findMany({
            where: searchCondition,
            include: {
                user: true,
                category: true,
            }
        });

        const totalMessages = messages.length;
        const totalPages = Math.ceil(totalMessages / limit);

        const renderMessages = messages.slice(skip, skip + limit);

        res.render('posts', { 
            title: 'Messages', 
            messages: renderMessages, 
            user: req.user,
            currentPage: page,
            totalPages,
            searchQuery
        });
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