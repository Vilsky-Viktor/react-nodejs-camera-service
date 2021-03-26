const jwt = require('../services/jwt');

// Auth middleware for protected JWT routes
class JwtAuth {
    check(req, res, next) {
        try {
            const token = req.cookies.token;
            req.user = jwt.verifyToken(token);
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    }
}


module.exports = new JwtAuth;
