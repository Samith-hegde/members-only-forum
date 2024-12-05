const prisma = require('../config/prismaClient');

const newPostForm = async (req, res) => {
    const categories = await prisma.categories.findMany();

    res.render('newPost', { title: 'New Post', user: req.user, categories });
};

const createPost = async (req, res) => {
    try {
        const { title, textContent, category, newCategory } = req.body;
        let categoryId = null;
    
        if (newCategory && !category) {
          const createdCategory = await prisma.categories.create({
            data: {
              name: newCategory.trim()
            }
          });
          categoryId = createdCategory.id; // Assuming the id field is named 'id'
        } else if (category) {
          categoryId = parseInt(category);
        }
    
        const post = await prisma.messages.create({
          data: {
            title: title.trim(),
            textContent: textContent.trim(),
            userId: req.user.userId,
            categoryId: categoryId, // This will now be correctly assigned
          }
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
}

module.exports = { newPostForm, createPost };