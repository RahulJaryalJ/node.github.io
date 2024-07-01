const Custom  = require("./custom");
const {StatusCodes} = require("http-status-codes");

class NotFound extends Custom {
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
};

module.exports = NotFound;