const express = require("express");
const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenModel = require("../models/blacklist.models");
const auth = require("../middlewares/auth.middlewares");

const userroutes = express.Router();

userroutes.post("/Signin", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        // console.log(user);
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id, user: user.name }, "blogger");
                    res.json({ msg: "Logged In!!", token: token });
                } else {
                    res.json({ error: "Wrong Credentials" });
                }
            });
        }
    } catch (error) {
        res.json({ "error": error.message });
    }
});

userroutes.post("/Signup", async (req, res) => {
    let { email, name, pass, role } = req.body;
    let exuser = await UserModel.findOne({ email: email });
    if (exuser) {
        res.status(200).json({ "msg": "User already exists" });
    } else {
        try {
            bcrypt.hash(pass, 3, async (err, hash) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                } else {
                    let new_user = new UserModel({ email, name, pass: hash, role });
                    await new_user.save();
                    res.status(200).json({ "msg": "New user has been registered" });
                }
            });
        } catch (error) {
            res.status(400).json({ "error": error.message })
        }
    }
});

userroutes.get("/Signout", auth, async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        let bltoken = new TokenModel({ token });
        await bltoken.save();
        res.status(200).json({ msg: "User has been logged out" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = userroutes