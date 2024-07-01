const { Custom } = require("../errors")
const { StatusCodes } = require("http-status-codes");

const errorHandler = async (err, req, res, next) => {

    let customErr = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "something went wrong try again later "
    }

    if (err.code && err.code === 11000) {
        customErr.statusCode = 400,
            customErr.msg = `this  ${Object.keys(err.keyValue)} is already in use`
    }
    if (err.name === 'ValidationError') {
        customErr.statusCode = 400,
        customErr.msg = Object.values(err.errors).map((item)=>item.message).join(",");
         
    }
    if (err.name ===  "CastError") {
        customErr.statusCode = 404,
        customErr.msg = `no value found with ${err.value._id}`;
         
    }
    console.log(err)

    // console.log(customErr.msg)
    

    // if (err instanceof Custom) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // };
    // console.log(err)
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customErr.statusCode).json({ message:customErr.msg })
    }

module.exports = errorHandler;


// duplicate errror email
// validation error
// cast error
// ;