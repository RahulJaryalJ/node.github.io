const Custom = require("./custom");
const {StatusCodes} = require("http-status-codes");

class Bad extends Custom{
     constructor(message){
         super(message);
         this.statusCode = StatusCodes.BAD_REQUEST;
     }
}

module.exports = Bad;