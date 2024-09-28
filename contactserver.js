const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "3820f2755bb1b6",
            pass: "9f88e5e26766de"
        }
    });

    const mailOptions = {
        from: email,
        to: "shopnexcontact@gmail.com",
        subject: "Asking queries",
        html: `<b>${message}</b>`,
    };

    try {
        const mailResponse = await transport.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully", mailResponse });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email" });
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));