const User = require("../model/auth");
// const bcrypt = require("bcryptjs");
const { Bad, Unauthenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes")
// const jwt = require("jsonwebtoken")


const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    // if (!name || !email || !password) {
    //     throw new Bad("kindly provide all those values")
    // }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // const tempUser = {name, email, password:hashedPassword};
    const user = await User.create({ ...req.body });
    // when model get called thenn it will run pre save method
    // const token = jwt.sign({ name: user.name }, process.env.JWT_KEY, { expiresIn: process.env.JWT_VALIDITY })
    const token = user.getToken();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    console.log(req)
    const { email, password } = req.body;

    // if (!email || !password) {
    //     throw new Bad("provide values")
    // }
    const user = await User.findOne({ email });

    if (!user) {
        throw new Unauthenticated("Invalid Credantials");
    }
    const isMatchedPassword = await user.comparePassword(password);
    if (!isMatchedPassword) {
        throw new Unauthenticated("invalid credantials")
    }
    const token = user.getToken();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = { signUp, login }