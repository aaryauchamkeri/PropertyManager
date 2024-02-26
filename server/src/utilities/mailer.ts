import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer/index.js';
import xoauth2 from 'xoauth2';

// const transport = nodemailer.createTransport("SMTP", {
//     service: 'gmail',
//     secure: true,
//     auth: {
//         user: 'aaryachamkeri2006@gmail.com',
//         pass: 'gcpu fdjd yprt nnmm',
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