const nodemailer = require('nodemailer');

export default async (req, res) => {
    const { from, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: from,
        to: process.env.EMAIL_USER,
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
