const jwt = require("jsonwebtoken");
const TokenModel = require("../models/blacklist.models");
const UserModel = require("../models/user.models");

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    let bltoken = await TokenModel.find({ token });
    // console.log(token);
    if (token) {
        if (bltoken.length != 0) {
            res.status(200).json({ msg: "Please Login again!!" });
        }else{
            try {
                const decoded = jwt.verify(token, "blogger");
                let {userID} = decoded; 
                console.log(userID);
                let user = await UserModel.findOne({_id:userID});
                let role = user?.role;
                req.role = role;
                if (decoded) {
                    req.body.userID = decoded.userID;
                    req.body.user = decoded.user;
                    next();
                } else {
                    res.json({ msg: error.message });
                }
            } catch (error) {
                res.json({ msg: error.message });
            }
        }
    }else{
        res.json({msg: "Please Login!!"});
    }
}

module.exports = auth;