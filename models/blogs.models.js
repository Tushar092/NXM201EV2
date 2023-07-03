const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: String,
    body: String,
    userID: String,
    user: String
}, {
    versionKey: false
});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;