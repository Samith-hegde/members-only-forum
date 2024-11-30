const prisma = require('../config/prismaClient');

const clubMemberForm = (req, res) => {
    res.render('clubMember', { title: 'Update Membership', user: req.user });
};

const updateMembership = async (req, res) => {
    try {
        if (!req.body.secretCode || req.body.secretCode !== process.env.CLUB_SECRET) {
            res.send('Invalid code!');
            return;
        }

        const user = await prisma.users.update({
            where: {
                userId: req.user.userId
            },
            data: {
                membershipStatus: 'club member'
            }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('An error occurred: ' + error);
    }
};

module.exports = { clubMemberForm, updateMembership };