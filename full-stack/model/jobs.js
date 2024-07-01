const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, "provide values"],
        maxlength: 20
    },
    position:{
        type:String,
        reqiured:[true, "provide position"],
        maxlength: 40
    },
    status:{
        type:String,
        enum: ["new-comer", "senior", "junior"],
        default: "new-comer"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "please provide user"]

    },
},
{timestamps:true}

)

module.exports = mongoose.model("Job", jobsSchema)