
const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {
    // console.log("req.headers.authorizationreq.headers.authorization", req.headers.cookie);
    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1]
        // console.log("tokentokentoken", token);
        const user = jwt.verify(token, "vishal")
        // console.log("useruseruseruser",user);
        req.userDetails = user.data
        next()
    } else {
        return res.status(401).json({ message: "Authorization required" })
    }
}

module.exports = verify