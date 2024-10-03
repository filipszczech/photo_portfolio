import FormData from 'form-data'; // Import FormData jako moduł ES6
import Mailgun from 'mailgun.js';  // Import Mailgun jako moduł ES6

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
});

export default eventHandler(async (event) => {
    const body = await readBody(event);

    if (event.node.req.method !== "POST") {
        return { statusCode: 405, body: { message: "Method not allowed" } };
    }

    const { email, name, phone, selectedSubject, date, message } = body;

    if (!email || !name || !selectedSubject || !date || !message) {
        return { statusCode: 400, body: { message: "All fields are required" } };
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nowa sesja od ${name} - ${selectedSubject}`,
        text: `Imię: ${name}\nTelefon: ${phone}\nData: ${date}\nWiadomość: ${message}`,
    };

    try {
        await mg.messages.create('https://api.mailgun.net/v3/sandbox1fa371a0e80746679b91c757276a0dc4.mailgun.org/messages', mailOptions);
        return { statusCode: 200, body: { message: "Email sent successfully" } };
    } catch (error) {
        return { statusCode: 500, body: { message: "Error sending email", error: error.message } };
    }
});
