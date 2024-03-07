import schedule from 'node-schedule';
import { sendMail } from '../utilities/mailer.js';
import { remDbConDynamic } from '../database/connection.js';

// Portfolio pms password: hpbk cclj jrby lmpv
class EventService {

    accountId: Number
    static jobs = []

    constructor(accountId: Number) {
        this.accountId = accountId;
    }

    async addEvent(date: Date, title: String, description: String) {
        await remDbConDynamic('events').insert({
            date: date,
            title: title,
            description: description,
            accountId: this.accountId
        });
    }

    async viewAll(): Promise<any[]> {
        return remDbConDynamic('events').select('*').where({
            accountId: this.accountId
        });
    }

    static async schedule(date: Date) {
        let x = schedule.scheduleJob(date, function() {
            // sendMail()
        });

        this.jobs.push(x);
    }
}

export {EventService};