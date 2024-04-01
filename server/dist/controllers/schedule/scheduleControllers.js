var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EventService } from "../../services/EventService.js";
let addEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.accountId;
    const userId = req.jwtDecoded.id;
    const body = req.body;
    try {
        const eventService = new EventService(Number(accountId));
        console.log(body.date);
        const eventDate = new Date(body.date);
        const title = body.title;
        const description = body.description;
        console.log(body);
        const dayBefore = new Date(eventDate.getTime() - (24 * 60 * 60 * 1000));
        yield eventService.addEvent(eventDate, title, description);
        res.status(200).end();
    }
    catch (err) {
        next(err);
    }
});
let viewEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const eventService = new EventService(Number(accountId));
        let events = yield eventService.viewAll();
        console.log(events);
        res.status(200).json(events);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
export { addEvent, viewEvents };
//# sourceMappingURL=scheduleControllers.js.map