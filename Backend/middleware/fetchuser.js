const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = "Siddhant@1";

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add id to the user.

    const token = req.header("auth-token")
    if(!token) {
        res.status(401).send("Please authenticate using valid token")
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_TOKEN)
        req.user = data.user
    } catch (error) {
        res.status(401).send("Please authenticate using valid token")
    }
    next()
}

module.exports = fetchuser