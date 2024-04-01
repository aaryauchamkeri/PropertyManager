import schedule from 'node-schedule';
import { EventDescription } from './EventScheduler.types.js';


class EventScheduler {  
    constructor() {

    }
    
    scheduleJob(day: Date, info: EventDescription) {
        const dayBefore = new Date(day.getTime() - (24 * 60 * 60 * 1000));
        schedule.scheduleJob(dayBefore, () => {
            
        });
    }
}

// export {EventScheduler};