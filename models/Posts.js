const mongoose = require('mongoose');
const moment = require("moment");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    create_by: {
        type: String
    },
    create_dt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);