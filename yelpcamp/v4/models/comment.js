var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text:String,
    Author:String
});

module.exports = mongoose.model("Comment", commentSchema);