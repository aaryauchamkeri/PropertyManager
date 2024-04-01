var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'portfoliopmsreminders@gmail.com',
        pass: 'mrpk canp ppin vrol',
    }
});
const sendMail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        transport.sendMail(mailOptions);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
export { sendMail };
//# sourceMappingURL=mailer.js.map