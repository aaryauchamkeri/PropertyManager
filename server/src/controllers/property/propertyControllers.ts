import { Response } from "express";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import PropertyService from "../../services/PropertyServices.js";
import { remDbConDynamic } from "../../database/connection.js";

let addProperty = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const body = req.body;
        const accountId = req.header('accountId');
        const jwtDecoded = req.jwtDecoded;
        const propertyServce = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
        const propertyId = await propertyServce.addProperty({...body.data});
        if(propertyId > 0) res.status(200).json({id: propertyId});
        else res.status(400).end();
    } catch(err) {
        next(err);
    }
}

let addImages = async (req: RequestWithIdAdmin, res: Response, next) => {
    const propertyId: string = req.body.propertyId;
    const jwtDecoded = req.jwtDecoded;  
    if(req.files) {
        let photos = req.files;
        let propertyService = new PropertyService(req.accountId, jwtDecoded.id, req.isAdmin);
        let err = await propertyService.saveImages(photos, propertyId);
        res.json(err);
    } else {
        res.status(400).json({'error': 'No images provided.'});
    }
}

let viewImages = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let propertyId = String(req.query.propertyId);
        if(propertyId) {
            let propertyService = new PropertyService(req.accountId, req.jwtDecoded.id, req.isAdmin);
            let images = await propertyService.getFilesByProperty(propertyId, true);
            res.status(200).json(images);
        } else {
            next(new Error('No property id provided'));
        }
    } catch(err) {
        res.status(400).end();
    }
}

let updateProperty = async (req: RequestWithIdAdmin, res: Response, next) => {
    try{
        const body = req.body;
        const jwtDecoded = req.jwtDecoded;
        const accountId = req.header('accountId');
        const propertyId = body.propertyId;
        const dataTbu = body.update;
        const propertyService = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
        let updated = propertyService.updateProperty(propertyId, dataTbu);
        if(updated) res.status(200).end();
        else res.status(400).end();
    } catch(err) {
        next(err);
    }
}

let deleteProperty = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        if(req.params.propertyId) {
            const propertyId = req.params.propertyId;
            const accountId = req.accountId;
            const jwtDecoded = req.jwtDecoded;
            const propertyService = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
            let deleted = await propertyService.deleteProperty(propertyId);
            if(deleted) res.status(200).end();
            else res.status(400);
        } else {
            res.status(401).end();
        }
    } catch(err) {
        next(err);
    }
}

let getProperties = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.header('accountId');
        const userId = req.query.userId;
        const propertyServce = new PropertyService(accountId, String(userId), false);
        res.status(200).json(await propertyServce.getProperties());
    } catch(err) {
        next(err);
    }
}

let viewProperty = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.query.propertyId;
        console.log(propertyId);
        const propertyService = new PropertyService(accountId, userId, false);
        let property = await propertyService.getProperty(Number(propertyId));
        res.status(200).json(property);
    } catch (err) {
        res.status(400).end();
    }
}

let viewTenants = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.query.propertyId;
        const propertyService = new PropertyService(accountId, userId, false);
        let tenants = await propertyService.getTenantsAssociated(Number(propertyId));
        res.status(200).json(tenants);
    } catch (err) {
        res.status(400).end();
    }
}

let addNote = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.params.propertyId;
        const note = req.body.note;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        await propertyService.addNote(propertyId, note, userId, new Date());
        res.status(200).end();
    } catch (err) {
        next(err);
    }
}

let addTask = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.params.propertyId;
        const task = req.body.task;
        const deadline = req.body.deadline;
        const calendar = req.body.calendar;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        await propertyService.addTask(propertyId, task, deadline, userId, calendar);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
}

let getNotes = async(req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.params.propertyId;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        let notes = await propertyService.getNotes(propertyId);
        res.json(notes);
    } catch(err) {
        next(err);
    }
}

let getTasks = async(req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.params.propertyId;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        let tasks = await propertyService.getTasks(propertyId);
        res.json(tasks);
    } catch(err) {
        next(err);
    }
}

export {addProperty, addImages, viewImages, updateProperty, deleteProperty, 
        getProperties, viewProperty, viewTenants, addNote, addTask, getNotes,
        getTasks};