const logger = require('../services/logger');

// Common controller to be extended by all the other controllers
class Controller {
    // Common handler of errors with Winston logger
    handleError(res, error) {

        const status = error.status || 500;
        const message = error.message || 'Unknown error';

        if (status === 500) logger.logError(error);

        res.status(status).json({
            status: status,
            error: message
        });

    }

    // Send response with token cookie
    sendCookieResponse(res, token, data) {

        const cookieOptions = {
            httpOnly: true,
            maxAge: process.env.JWT_LIFETIME * 1000
        };

        res.cookie('token', token, cookieOptions)
            .status(200).json({
                status: 200,
                data: {...data}
            })

    }

    // Send successful response
    sendResponse(res, data) {

            res.status(200).json({
                status: 200,
                data: {...data}
            })

    }
}

module.exports = Controller;
