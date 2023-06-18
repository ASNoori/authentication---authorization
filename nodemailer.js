const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth:{
        user:"nooriameer12@outlook.com",
        pass:"thisismymicrosoftacc!"
    }
})

const options = {
    from: "nooriameer12@outlook.com",
    to: "noori.techzar@gmail.com",
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