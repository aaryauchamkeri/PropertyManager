import schedule from 'node-schedule';
class EventScheduler {
    constructor() {
    }
    scheduleJob(day, info) {
        const dayBefore = new Date(day.getTime() - (24 * 60 * 60 * 1000));
        schedule.scheduleJob(dayBefore, () => {
        });
    }
}
// export {EventScheduler};
//# sourceMappingURL=EventScheduler.js.map