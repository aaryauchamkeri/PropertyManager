var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import schedule from 'node-schedule';
import { sendMail } from '../utilities/mailer.js';
import { remDbConDynamic } from '../database/connection.js';
// Portfolio pms password: hpbk cclj jrby lmpv
class EventService {
    constructor(accountId) {
        this.accountId = accountId;
    }
    addEvent(date, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scheduledDate = new Date(date.getTime() - (24 * 60 * 60 * 1000));
                yield this.schedule(scheduledDate, 'Event Reminder', `Reminder of event: ${title} in 24 hours. Description: \n ${description}`);
                yield remDbConDynamic('events').insert({
                    date: date,
                    title: title,
                    description: description,
                    accountId: this.accountId
                });
            }
            catch (err) {
                return false;
            }
        });
    }
    viewAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return remDbConDynamic('events').select('*').where({
                accountId: this.accountId
            });
        });
    }
    schedule(date, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let accountId = this.accountId;
                let x = schedule.scheduleJob(date, () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let emails = yield remDbConDynamic('account_users')
                            .innerJoin('users', 'account_users.userId', '=', 'users.id')
                            .select('account_users.*', 'users.email')
                            .where({
                            accountId
                        });
                        emails.forEach(element => {
                            sendMail({
                                from: 'The Portfolio PMS Team',
                                to: element.email,
                                text: content
                            });
                        });
                    }
                    catch (err) {
                    }
                }));
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
}
EventService.jobs = [];
export { EventService };
//# sourceMappingURL=EventService.js.map