const mongoose = require('mongoose');

// User model for MongoDB
class User {
    constructor() {
        this.schema = this.createSchema();
    }

    // Create schema with data check
    createSchema() {

        return mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true, match: /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm },
            password: { type: String, required: true }
        });

    }

    getSchema() {
        return mongoose.model('User', this.schema);
    }
}

module.exports = new User().getSchema();
