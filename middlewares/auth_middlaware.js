const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }
        console.log('Authorize request');
        next();
    } catch (error) {
        console.log('Token not Authorize');
        res.status(401).json({ error });
    }
}