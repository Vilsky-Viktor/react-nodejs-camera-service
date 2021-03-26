const jwt = require('jsonwebtoken');

// JWT token separate service
class JsonWebToken {
    // It's better to consider RS256 standard with private and public keys
    generateToken(userId) {
        return jwt.sign(
            {
                id: userId,
            },
            process.env.JWT_KEY,
            {
                expiresIn: parseInt(process.env.JWT_LIFETIME),
                issuer: process.env.APP_NAME,
            }
        );
    }

    // Verify token with a key from .env file
    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_KEY);
    }
}

module.exports = new JsonWebToken;
