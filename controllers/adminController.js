const prisma = require('../config/prismaClient');

const adminForm = (req, res) => {
    res.render('admin', { title: 'Update Admin Privileges', user: req.user });
};

const updateIsAdmin = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            res.send('You are already an admin!');
            return;
        }

        if (!req.body.secretCode || req.body.secretCode !== process.env.ADMIN_SECRET) {
            res.send('Invalid code!');
            return;
        }

        const user = await prisma.users.update({
            where: {
                userId: req.user.userId
            },
            data: {
                isAdmin: true
            }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
};

module.exports = { adminForm, updateIsAdmin };