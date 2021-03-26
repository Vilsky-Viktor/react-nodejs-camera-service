const mongoose = require('mongoose');
const Controller = require('./controller');
const Camera = require('../models/camera');

// Video stream (Camera) controller
class Cameras extends Controller {
    constructor() { super() }

    // Get a list of video streams related to user model and sorted by created date
    getAll(req, res, next) {

        Camera.find({ user: req.user.id })
            .select('_id title url createdAt')
            .sort({createdAt: 'desc'})
            .exec()
            .then(result => super.sendResponse(res, {
                items: result
            }))
            .catch(err => super.handleError(res, err));

    }

    // Create a new video stream attached to user
    create(req, res, next) {

        const camera = new Camera({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            url: req.body.url,
            user: req.user.id
        });

        return camera.save()
            .then(saved => {
                super.sendResponse(res, {
                    id: saved._id,
                    title: saved.title,
                    url: saved.url
                })
            })
            .catch(err => super.handleError(res, err))

    }

    // Get video stream by ID
    getById(req, res, next) {

        Camera.findById(req.params.id)
            .select('_id title url createdAt')
            .exec()
            .then(result => {
                if (!result) throw({ status: 404, message: "No entry found"});

                super.sendResponse(res, {
                    item: result
                });
            })
            .catch(err => super.handleError(res, err));

    }

    // Remove video stream from the list
    remove(req, res, next) {

        Camera.deleteOne({ _id: req.params.id }).exec()
            .then(removed => super.sendResponse(res, {}))
            .catch(err => super.handleError(res, err));

    }
}

module.exports = new Cameras;
