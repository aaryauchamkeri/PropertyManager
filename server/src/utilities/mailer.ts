import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer/index.js';

// const transport = nodemailer.createTransport("SMTP", {
//     service: 'gmail',
//     secure: true,
//     auth: {
//         user: 'chamkeriaarya@gmail.com',
//         pass: 'hpbk cclj jrby lmpv',
//     }
// });

const sendMail = async (mailOptions: Mail.Options): Promise<boolean> => {

    // try {
    //     transport.sendMail(mailOptions);
    //     return true;
    // } catch(err) {
    //     console.log(err);
    //     return false;
    // }

    return true;
}

export {sendMail};