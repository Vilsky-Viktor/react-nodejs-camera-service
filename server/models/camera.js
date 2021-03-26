const mongoose = require('mongoose');

// Video stream model for MongoDB
class Camera {
    constructor() {
        this.schema = this.createSchema();
    }

    // Create schema with data check
    createSchema() {
        return mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            title: { type: String, required: true },
            url: { type: String, required: true, match: /^rtsp:\/\/[^\s$.?#].[^\s]*$/igm },
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            createdAt: { type: Date, default: Date.now }
        });
    }

    getSchema() {
        return mongoose.model('Camera', this.schema);
    }
}

module.exports = new Camera().getSchema();
