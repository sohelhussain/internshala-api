const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next, url) => {
    console.log('sendmail');
    // this is a boilerplate(knha se konsi servise se mail jayeg)
    const transport = nodemailer.createTransport({
        service: "gmail",
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    // mail me kya hona chaiye(kisko kya mail jayega)

    const mailOptions = {
        from: "100xdev master sohelhussain",
        to: req.body.email,
        subject: "password reset link",
        // "text": "do not share this link to " //? you write a text here, what erver you want
        html:  `<h1> click the link below to reset the password. </h1>
        <a href="${url}">password reset link</a>`
    }

    transport.sendMail(mailOptions,(err,info)=>{
        console.log('this is sendmail clg');
        if(err) return next(new ErrorHandler(err, 500))
            console.log(info);
        return res.status(200).json({message: "male send successfully", url})
    })

}