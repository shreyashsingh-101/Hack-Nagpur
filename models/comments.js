const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    author: String,
    comment: String
});

module.exports = mongoose.model("Comment",commentSchema);