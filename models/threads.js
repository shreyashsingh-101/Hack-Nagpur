const mongoose = require('mongoose');

var threadSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    category: String,
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]
});

module.exports = mongoose.model("Thread",threadSchema);