const Custom =  require("./custom");
const {StatusCodes} = require("http-status-codes");

class Unauthenticated extends Custom{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = Unauthenticated;
