const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail or your preferred email service
  auth: {
    user: 'webdesignsbyali@gmail.com', // Replace with your email address
    pass: 'jnmn btsx fmqx bvru',  // Replace with your email password (or app-specific password if using Gmail)
  },
});

// API route to handle form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'shoeb@wrkinsilence.com', // The email where the form data will be sent
    subject: 'New Marketing Campaign Request',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
