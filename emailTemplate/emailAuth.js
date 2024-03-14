const  nodemailer = require('nodemailer');

const  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fazilotislam5@gmail.com',
        pass: 'guys fobn ssyb xnkt'
    }
});

module.exports = transporter;