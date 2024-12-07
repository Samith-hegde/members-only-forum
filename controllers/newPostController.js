const prisma = require('../config/prismaClient');
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('title').trim()
    .isLength({ min: 1 }).withMessage('Title must not be empty.')
    .isLength({ max: 25 }).withMessage('Title must not be more than 25 characters long.'),
  body('textContent').trim()
    .isLength({ min: 1 }).withMessage('Text content must not be empty.')
    .isLength({ max: 1000 }).withMessage('Text content must not be more than 1000 characters long.'),
]

const newPostForm = async (req, res) => {
    const categories = await prisma.categories.findMany();

    res.render('newPost', { title: 'New Post', user: req.user, categories, errors: [] });
};

const createPost = [
  validateUser,
  async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          const categories = await prisma.categories.findMany();
          return res.status(400).render('newPost', { title: 'New Post', user: req.user, categories, errors: errors.array() });
        }

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
];

module.exports = { newPostForm, createPost };