const winston = require('winston');

// Separate class for Winston logger
class Logger {

    constructor() {
        this.configureLogger();
    }

    // Logger configuration
    configureLogger() {

        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'error.log' })
            ]
        });

    }

    // Log an error
    logError(error) {
        const status = error.status || 500;
        this.logger.error(`${status}: `, error);
    }

}

module.exports = new Logger;
