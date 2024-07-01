const User = require("../model/auth");
const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const auth = async (req, res, next) => {
    // console.log(req)
    let token = req.headers.authorization;
    // console.log(token);
    if (!token || !token.startsWith("Bearer ")) {
        throw new Unauthenticated("invalid credantials")
    }
    token = token.split(" ")[1];
    // console.log(token)

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        // console.log(payload)
        // req.user = await User.findById(payload.userId).select("-password")
        // console.log(req.user);
        req.user = { userId: payload.userId, name: payload.name };
        // console.log(req)
        next();

    } catch (error) {
        throw new Unauthenticated("invalid credantials")
    }

}

module.exports = auth;