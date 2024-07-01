require("dotenv").config()
require("express-async-errors")


const express = require("express");
const app = express();

//  standard security features
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// requiring db function

const connectDb = require("./DB/connectDB")

const signingFunctions = require("./routers/signup")
const crudFunctions = require("./routers/crud")

app.use(express.static("./public"))


app.set("trust proxy", 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(xss())




app.use(express.urlencoded({ extended: false }))
// middleware

const notFound = require("./Middleware/notFound")
const errorHandler = require("./Middleware/errorHandler")
const auth = require("./Middleware/auth")

// implementing functionality

app.use("/api/v1", signingFunctions);
app.use("/api/v1/jobs", auth, crudFunctions);
app.use(notFound);
app.use(errorHandler)


// starting server 

const port = 5000;

app.listen(port, async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        console.log(`server is listening on port ${port}`)

    } catch (error) {
        console.log(error);
    }
}
)