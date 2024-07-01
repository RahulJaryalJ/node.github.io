const nodemailer = require("nodemailer")
const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"rahuljaryal4@gmail.com",
        pass:"eycw sewc trql jfnq"
    }
})

const mailOptions = {
    from: "rahuljaryal4@gmail.com",
    to:"jimmyjaryal4@gmail.com",
    subject:"nodemailer",
    html: `<h1>hello world</h1>`
}

transport.sendMail(mailOptions, (err, info)=>{

if(err){
    console.log(err)
}else{
    console.log("email send: " + info.response)
}

})