import { Request, Response } from "express";
import { RequestWithId } from "../../middleware/authentication/jwtMiddleware.js";
import { sendMail } from "../../utilities/mailer.js";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import { EventService } from "../../services/EventService.js";

let addEvent = async (req: RequestWithIdAdmin, res: Response, next) => {
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
        await eventService.addEvent(eventDate, title, description);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
}

let viewEvents = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const eventService = new EventService(Number(accountId));
        let events = await eventService.viewAll();
        console.log(events);
        res.status(200).json(events);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

let test = async (req: Request, res: Response, next) => {
    try {
        await sendMail({from: 'aaryachamkeri2006@gmail.com', to: 'chamkeriaarya@gmail.com',
                        subject: 'Test Mail', text: 'This is a Test mail'});
        res.status(200).end();
    } catch(err) {
        console.log(err);
        res.status(400).end();
    }
    
}



export {addEvent, viewEvents, test};