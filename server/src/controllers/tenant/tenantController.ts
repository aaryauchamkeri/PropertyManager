import { Response } from "express";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import TenantService from "../../services/TenantService.js";


let addTenant = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let body = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.header('accountId');
        if(body && accountId) {
            let tenantService = new TenantService(accountId, jwtDecoded.id);
            let id = await tenantService.addTenant({accountId, ...body});
            if(id < 0) res.status(400).end();
            else res.status(200).json({tenantId: id});
        } else {
            res.status(400).json({message: 'Missing required field.'});
        }
    } catch(err) {
        res.status(400).end();
    }
}

let updateTenant = (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let {id, update} = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.accountId;
        const tenantService = new TenantService(accountId, jwtDecoded.id);
        tenantService.updateTenant(id, update);
        res.status(200).end();
    } catch(err) {
        res.status(400).end();
    }
}

let deleteTenant = (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let jwtDecoded = req.jwtDecoded;
        let tenantId = req.header('tenantId');
        let accountId = req.accountId;
        let tenantService = new TenantService(accountId, jwtDecoded.id);
        tenantService.deleteTenant(tenantId);
        res.status(200).end();
    } catch(err) {
        res.status(400).end();
    }
}

let viewTenant = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.accountId;
        let tenantId = req.query.tenantId;
        let tenantService = new TenantService(accountId, jwtDecoded.id);
        res.status(200).json(await tenantService.viewTenant(String(tenantId)));
    } catch(err) {
        res.status(400).end();
    }
}

let viewAllTenants = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let userId = req.jwtDecoded.id;
        let tenantService = new TenantService(req.accountId, userId);
        res.status(200).json(await tenantService.viewAllTenants());
    } catch(err) {
        res.status(400).end();
    }
}

let addProfileImage = async (req: RequestWithIdAdmin, res: Response, next) => {
    const tenantId: string = req.body.tenantId;
    const jwtDecoded = req.jwtDecoded;  
    if(req.files) {
        let photos = req.files;
        let propertyService = new TenantService(req.accountId, jwtDecoded.id);
        let err = await propertyService.saveFiles(tenantId, [photos[0]]);
        res.json(err);
    } else {
        res.status(400).json({'error': 'No images provided.'});
    }
}

let viewProfileImage = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let tenantId = String(req.query.tenantId);
        if(tenantId) {
            let tenantService = new TenantService(req.accountId, req.jwtDecoded.id);
        } else {
            next(new Error('No property id provided'));
        }
    } catch(err) {
        res.status(400).end();
    }
}

let viewFiles = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let tenantId = String(req.query.tenantId);
        if(tenantId) {
            let tenantService = new TenantService(req.accountId, req.jwtDecoded.id);
            let files = await tenantService.getFilesByTenant(tenantId, false);
            res.status(200).json(files);
        } else {
            next(new Error('No property id provided'));
        }
    } catch(err) {
        res.status(400).end();
    }
}

let addNote = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const note = req.body.note;
        const tenantService = new TenantService(accountId, userId);
        await tenantService.addNote(tenantId, note, userId, new Date());
        res.status(200).end();
    } catch (err) {
        res.status(400).end();
    }
}

let addTask = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const task = req.body.task;
        const deadline = req.body.deadline;
        const calendar = req.body.calendar;
        const tenantService = new TenantService(accountId, userId);
        await tenantService.addTask(tenantId, task, deadline, userId, calendar);
        res.status(200).end();
    } catch (err) {
        res.status(400).end();
    }
}

let getNotes = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const tenantService = new TenantService(accountId, userId);
        let notes = await tenantService.getNotes(tenantId);
        res.json(notes);
    } catch(err) {
        res.status(400).end();
    }
}

let getTasks = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const tenantService = new TenantService(accountId, userId);
        let tasks = await tenantService.getTasks(tenantId);
        res.json(tasks);
    } catch(err) {
        res.status(400).end();
    }
}

let getAllNotes = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantService = new TenantService(accountId, userId);
        const allNotes = await tenantService.getAllNotes();
        res.json(allNotes);
    } catch (err) {
        res.status(400).end();
    }
}

let getAllTasks = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantService = new TenantService(accountId, userId);
        const allNotes = await tenantService.getAllTasks();
        res.json(allNotes);
    } catch (err) {
        res.status(400).end();
    }
}


export {addTenant, updateTenant, deleteTenant, viewTenant, viewAllTenants, 
        addProfileImage, viewProfileImage, viewFiles, addNote, addTask, getNotes, 
        getTasks, getAllNotes, getAllTasks};