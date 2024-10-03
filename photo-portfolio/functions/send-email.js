const nodemailer = require('nodemailer');

export default async function sendEmail(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { from, subject, text } = req.body;

    if (!from || !subject || !text) {
        return res.status(400).json({ message: 'All fields are required' });
    }

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
        return res.status(200).json({ message: 'Email sent successfully', info: info.response });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
};
