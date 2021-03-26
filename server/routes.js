const express = require('express');
const users = require('./controllers/users');
const cameras = require('./controllers/cameras');
const jwtAuth = require('./middleware/jwt-auth');

// Separate class to generate routes for App
class Routes {
    constructor() {
        this.router = express.Router();
    }

    getUserRoutes() {
        this.router.post('/signup', users.signup.bind(users));
        this.router.post('/login', users.login.bind(users));
        this.router.get('/check-token', jwtAuth.check.bind(jwtAuth), users.checkToken.bind(users));
        this.router.get('/logout', jwtAuth.check.bind(jwtAuth), users.logout.bind(users));
        return this.router;
    }

    getCameraRoutes() {
        this.router.get('/', jwtAuth.check.bind(jwtAuth), cameras.getAll.bind(cameras));
        this.router.post('/', jwtAuth.check.bind(jwtAuth), cameras.create.bind(cameras));
        this.router.get('/:id', jwtAuth.check.bind(jwtAuth), cameras.getById.bind(cameras));
        this.router.delete('/:id', jwtAuth.check.bind(jwtAuth), cameras.remove.bind(cameras));
        return this.router;
    }
}

module.exports = new Routes;
