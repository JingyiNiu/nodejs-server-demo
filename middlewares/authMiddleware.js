const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const token_secret_key = process.env.TOKEN_SECRET_KEY;

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }
    try {
        const decoded = jwt.verify(token, token_secret_key);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = auth;
