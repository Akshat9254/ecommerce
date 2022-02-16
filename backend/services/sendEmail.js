const nodemailer = require('nodemailer')
const { SMTP_SERVICE, SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = require('../config')


module.exports = async (options) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        service: SMTP_SERVICE,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)
}