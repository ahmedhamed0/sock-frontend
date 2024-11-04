const jwt = require('jsonwebtoken');
const secretKey = 'a6IZXyYj5CVjug+zEYxT5XEKknJcYHKu2MJKQVtHEtFO4B36J+6KEOgtbtunqev2UJ9Bv7wGJFSdSMFn38fXgw=='; // Use a strong secret key in production

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
