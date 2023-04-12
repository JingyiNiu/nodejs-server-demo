const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = 10;

const token_secret_key = process.env.TOKEN_SECRET_KEY;

const User = require('../../models/User.model');

const userController = {
    updatePassword: async (req, res) => {
        const token = req.header('x-auth-token');
        const decoded = jwt.verify(token, token_secret_key);
        const { email } = decoded;

        
        const { error } = validatePasswordForm(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        
        const { password, newPassword } = req.body;
        const user = await User.findOne({ where: { email } });

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({ error: 'Password not correct.' });
            return;
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.update({ password: hashedNewPassword }, { where: { email } });

        res.json({ message: 'Password updated successfully' });
    },
};

module.exports = userController;

const validatePasswordForm = (userForm) => {
    const schema = Joi.object({
        password: Joi.string().min(6).max(256).required(),
        newPassword: Joi.string().min(6).max(256).required(),
    });
    return schema.validate(userForm);
};
