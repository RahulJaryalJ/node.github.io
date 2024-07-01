
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        maxlength: 12,
        minlength: 4

    },
    email: {
        type: String,
        required: [true, "please provide email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "provide valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide password"],
        minlength: 6
    }
})

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

UserSchema.methods.getToken = function () {
    return jwt.sign({ userId:this._id, name: this.name }, process.env.JWT_KEY, { expiresIn: process.env.JWT_VALIDITY })
}


UserSchema.methods.comparePassword = async function(paswrd){
    const isMatched = await bcrypt.compare(paswrd, this.password);
    return isMatched;
}


module.exports = mongoose.model("User", UserSchema)