const express = require("express");
const auth = require("../middlewares/auth.middlewares");
const authorize = require("../middlewares/authorize.middlewares");
const BlogModel = require("../models/blogs.models");

const blogroutes = express.Router();

blogroutes.post("/createBlog", auth, authorize(["User"]), async (req, res) => {
    try {
        console.log(req.body);
        let new_blog = new BlogModel(req.body);
        console.log(new_blog);
        await new_blog.save();
        res.status(200).json({"msg": "New blog has been created"});
    } catch (error) {
        res.status(400).json({"err": error.message});
    }
});

blogroutes.get("/", auth, authorize(["User"]), (req, res) => {

});

blogroutes.patch("/updateBlog/:blog_id", auth, authorize(["User"]), async (req, res) => {
    const userIDinuserDoc = req.body.userID;
    let blogID = req.params.blog_id;
    try {
        const blog = await BlogModel.findOne({ _id: blogID });
        // console.log(blog);
        const userIDinblogDoc = blog.userID;
        console.log("userID user Doc", userIDinuserDoc, "userID in blog Doc", userIDinblogDoc);
        if (userIDinuserDoc === userIDinblogDoc) {
            await BlogModel.findByIdAndUpdate({ _id: blogID }, req.body);
            res.status(200).json({ msg: "Blog's been Updated" });
        } else {
            res.status(200).json({ msg: "Not Authorized" });
        }
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
});

blogroutes.delete("/deleteBlog/:blog_id", auth, authorize(["User"]), async (req, res) => {
    const userIDinuserDoc = req.body.userID;
    let blogID = req.params.blog_id;
    try {
        const blog = await BlogModel.findOne({ _id: blogID });
        // console.log(blog);
        const userIDinblogDoc = blog.userID;
        console.log("userID user Doc", userIDinuserDoc, "userID in blog Doc", userIDinblogDoc);
        if (userIDinuserDoc === userIDinblogDoc) {
            await BlogModel.findByIdAndDelete({ _id: blogID }, req.body);
            res.status(200).json({ msg: "Blog's been Deleted" });
        } else {
            res.status(200).json({ msg: "Not Authorized" });
        }
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
});

blogroutes.delete("/moderator_delete/:blog_id", auth, authorize(["Moderator"]), async (req, res) => {
    let blogID = req.params.blog_id;
    try {
            await BlogModel.findByIdAndDelete({ _id: blogID }, req.body);
            res.status(200).json({ msg: "Blog's been Deleted" });
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
});

module.exports = blogroutes;