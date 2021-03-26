const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('../services/jwt');

const Controller = require('./controller');
const User = require('../models/user');

// Use controller which is responsible for auth in this case
class Users extends Controller {
    constructor() { super() }

    // Registration of a new User with a check for a unique email and hashing of a password
    signup(req, res, next) {

        User.find({ email: req.body.email })
            .exec()
            .then(user => {

                if (user.length) throw({ status: 422, message: "Email already exist"});

                const hashedPassword = passwordHash.generate(req.body.password);
                if (!hashedPassword) throw({ status: 500, message: "Registration failed"});

                const newUser =  new User({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email.trim(),
                    password: hashedPassword
                });

                return newUser.save();

            })
            .then(saved => {
                const token = jwt.generateToken(saved._id);

                // Send jwt token cookie to front end for XSS security
                super.sendCookieResponse(res, token,{
                    name: saved.name,
                    email: saved.email,
                })
            })
            .catch(err => super.handleError(res, err));

    }

    // Login process of a user
    login(req, res, next) {

        User.find({ email: req.body.email.trim() })
            .exec()
            .then(user => {
                if (!user.length) throw({ status: 401, message: "Auth failed"});

                const isVerified = passwordHash.verify(req.body.password, user[0].password);
                if (!isVerified) throw({ status: 401, message: "Auth failed"});

                const token = jwt.generateToken(user[0]._id);

                // Send jwt token cookie to front end for XSS security
                super.sendCookieResponse(res, token, {
                    name: user[0].name,
                    email: user[0].email,
                })

            })
            .catch(err => super.handleError(res, err));

    }

    // Find user by provided ID from the token and verify token
    checkToken(req, res, next) {

        User.findById(req.user.id)
            .select('_id name email')
            .exec()
            .then(user => {
                super.sendResponse(res, {
                    name: user.name,
                    email: user.email
                })
            })
            .catch(err => super.handleError(res, err));
    }

    // Send request to front end to remove jwt token cookie
    logout(req, res, next) {
        res.clearCookie('token').sendStatus(200);
    }
}

module.exports = new Users;
