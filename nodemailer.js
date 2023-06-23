const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth:{
        user:"yyy@outlook.com",
        pass:"***********"
    }
})

const options = {
    from: "yyy@outlook.com",
    to: "xxx@gmail.com",
    subject:"Sending email with nodejs",
    text:"Wow that's simple",
    html:"<h1>Hello User</h1>"
}

transporter.sendMail(options,function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent: " + info.response);
})
