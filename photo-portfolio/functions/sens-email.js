const nodemailer = require('nodemailer');

export default async (req, res) => {
    const { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Twój email
            pass: process.env.EMAIL_PASS  // Twoje hasło do emaila lub App Password
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent', info: info.response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
