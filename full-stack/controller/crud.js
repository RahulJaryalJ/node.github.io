const Job = require("../model/jobs")
const { StatusCodes } = require("http-status-codes");
const { NotFound, Unauthenticated, Bad } = require("../errors")


const getAll = async (req, res) => {
    const { user: { userId, name } } = req
    const job = await Job.find({ createdBy: userId }).sort("-createdAt");
    res.status(StatusCodes.OK).json({ job, count: job.length, name })
}
const getSingle = async (req, res) => {
    console.log(req)
    const { user: { userId, name },
        params: { id: jobId } } = req
    const job = await Job.findOne({ createdBy: userId, _id: jobId })
    if (!job) {
        throw new NotFound("job didn't find")
    }
    res.status(StatusCodes.OK).json({ job, name })
}
const post = async (req, res) => {
    // throw new Unauthenticated("provide values")
    req.body.createdBy = req.user.userId
    console.log(req)
    const job = await Job.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ job })
    // res.json({name:"hello"})
}
const editing = async (req, res) => {
    const { body: { company, position, status },
        params: { id: jobId },
        user: { userId, name } } = req;

    if (!company || !position) {
        throw new Bad("provide all details")
    }
    const job = await Job.findByIdAndUpdate({ createdBy: userId, _id: jobId }, req.body, { new: true, runValidators: true });

    if (!job) {
        throw new NotFound("provide all info")
    }
    res.status(StatusCodes.CREATED).json({ job, name })
}
const dlt = async (req, res) => {
    const { user: { userId, name },
        params: { id: jobId } } = req
        const job = await Job.findByIdAndRemove({createdBy:userId, _id:jobId})

        if(!job){
            throw new NotFound(`job didnt find ${jobId}`);

        }
        res.status(StatusCodes.OK).json({job})
    // res.send("its delte request")
}

module.exports = { getAll, getSingle, post, editing, dlt }