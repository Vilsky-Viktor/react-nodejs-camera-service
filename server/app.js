const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const Controller = require('./controllers/controller');

// The main class with initialization of REST API, configuration and etc
class App extends Controller {
    constructor() {
        super();
        this.createApp();
        this.config();
        this.genRouter();
        this.handleCriticalErrors();
        this.connectDb();
        this.createServer();
        this.listen();
    }

    createApp() {
        this.app = express();
    }

    createServer() {
        this.server = http.createServer(this.app);
    }

    config() {
        this.port = process.env.SERVER_PORT || 333;

        // Handle CORS policy
        this.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            next();
        });

        // For the future responses to be able to catch them
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());

        if (process.env.NODE_ENV !== 'production') this.app.use(morgan('dev'));

        // A bit of protection. There are planty of options to play here
        this.app.use(helmet());
        this.app.disable('x-powered-by');
    }

    // Get all the route and handle 404 issue
    genRouter() {
        this.app.use('/api/users', routes.getUserRoutes());
        this.app.use('/api/cameras', routes.getCameraRoutes());

        this.app.use((req, res, next) => {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
        });
    }

    // Catch all the critical issues
    handleCriticalErrors() {
        this.app.use((err, req, res, next) => super.handleError(res, err));
    }

    // Last stage of starting a server
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }

    getApp() {
        return this.app;
    }

    // Connect to MongoDB
    connectDb() {
        mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .catch(error => console.log(error));

    }
}

module.exports = new App;
