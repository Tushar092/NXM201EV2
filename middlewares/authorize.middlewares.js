const authorize =  (permittedRole) => {
    return (req, res, next) => {
        console.log(req.role, req.userID);
        if(permittedRole.includes(req.role)){
            next();
        }else{
            res.send("Not Authorized");
        }
    }
}

module.exports = authorize;
