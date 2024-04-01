import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer/index.js';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'portfoliopmsreminders@gmail.com',
        pass: 'mrpk canp ppin vrol',
    }
});

const sendMail = async (mailOptions: Mail.Options): Promise<boolean> => {
    try {
        transport.sendMail(mailOptions);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

export {sendMail};