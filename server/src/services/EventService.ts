import schedule from 'node-schedule';
import { sendMail } from '../utilities/mailer.js';
import { remDbConDynamic } from '../database/connection.js';

// Portfolio pms password: hpbk cclj jrby lmpv
class EventService {

    accountId: number
    static jobs = []

    constructor(accountId: number) {
        this.accountId = accountId;
    }

    async addEvent(date: Date, title: String, description: String) {
        try {
            const scheduledDate = new Date(date.getTime() - (24 * 60 * 60 * 1000));
            await this.schedule(scheduledDate, 'Event Reminder', 
            `Reminder of event: ${title} in 24 hours. Description: \n ${description}`);
            await remDbConDynamic('events').insert({
                date: date,
                title: title,
                description: description,
                accountId: this.accountId
            });
        } catch (err) {
            return false;
        }
    }

    async viewAll(): Promise<any[]> {
        return remDbConDynamic('events').select('*').where({
            accountId: this.accountId
        });
    }

    async schedule(date: Date, subject: string, content: string) {
        try {
            let accountId = this.accountId;
            let x = schedule.scheduleJob(date, async () => {
                try {
                    let emails = await remDbConDynamic('account_users')
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
                } catch (err) {
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    }
}

export {EventService};