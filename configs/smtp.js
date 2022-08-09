const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

async function sendMail(mailTo, mailSubject, mailContent){
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: mailTo,
        subject: mailSubject,
        text: mailContent
    });
}

module.exports = { sendMail };