const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Use a strong secret key in production

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, secretKey, { expiresIn: '12h' });
};

module.exports = {
    generateToken,
};
