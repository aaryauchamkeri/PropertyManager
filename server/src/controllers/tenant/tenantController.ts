import { Response } from "express";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import TenantService from "../../services/TenantService.js";
import ActivityService from "../../services/ActivityService.js";

let addTenant = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let body = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.header('accountId');
        if(body && accountId) {
            let tenantService = new TenantService(accountId, jwtDecoded.id);
            let id = await tenantService.addTenant({accountId, ...body});
            await ActivityService.addActivity('created a tenant', jwtDecoded.id, {tenantId: id}, accountId);
            if(id < 0) res.status(400).end();
            else res.status(200).json({tenantId: id});
        } else {
            res.status(400).json({message: 'Missing required field.'});
        }
    } catch(err) {
        res.status(400).end();
    }
}

let updateTenant = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let {tenantId, update} = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.accountId;
        const tenantService = new TenantService(accountId, jwtDecoded.id);
        await ActivityService.addActivity('updated a tenant', jwtDecoded.id, {tenantId: tenantId}, accountId);
        await tenantService.updateTenant(tenantId, update);
        res.status(200).end();
    } catch(err) {
        console.log(err);
        res.status(400).end();
    }
}

let deleteTenant = (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let jwtDecoded = req.jwtDecoded;
        let tenantId = req.params.tenantId;
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

let uploadFiles = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let tenantId = req.body.tenantId;
        let files = req.files;
        let tenantService = new TenantService(req.accountId, req.jwtDecoded.id);
        console.log(tenantId);
        await tenantService.saveFiles(tenantId, files);
        res.status(200).end();
    } catch (err) {
        res.status(400).end();
    }
}

let addProfileImage = async (req: RequestWithIdAdmin, res: Response, next) => {
    const tenantId: string = req.body.tenantId;
    const jwtDecoded = req.jwtDecoded;  
    if(req.file && (req.file.mimetype.startsWith('image')) && tenantId) {
        let photo = req.file;
        let tenantService = new TenantService(req.accountId, jwtDecoded.id);
        console.log(photo);
        let added = await tenantService.addPfp(tenantId, photo);
        if(!added){
            res.status(400).json({'error': 'Error uploading image'});
        } else {
            res.status(200).end();
            await ActivityService.addActivity('added a profile image', jwtDecoded.id, {tenantId: tenantId}, req.accountId);
        }
    } else {
        res.status(500).json({'error': 'Error'});
    }
}

let viewProfileImage = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let tenantId = String(req.query.tenantId);
        if(tenantId) {
            let tenantService = new TenantService();
            let photo = await tenantService.getPfp(tenantId);
            const mimeType = photo.mime;
            let file = photo.file;
            res.setHeader('Content-Type', mimeType);
            res.send(file).end();
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
        await ActivityService.addActivity('added a note', userId, {tenantId: tenantId}, accountId);
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
        await ActivityService.addActivity('added a task', userId,{tenantId: tenantId}, accountId);
        await tenantService.addTask(tenantId, task, deadline, userId, calendar);
        res.status(200).end();
    } catch (err) {
        console.log(err);
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

let completeTask = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const taskId = req.query.taskId;
        const tenantService = new TenantService(accountId, userId);
        await tenantService.completeTask(String(taskId));
        res.status(200).end();
    } catch (err) {
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
        addProfileImage, viewProfileImage, uploadFiles, viewFiles, addNote, 
        addTask, getNotes, getTasks, completeTask, getAllNotes, getAllTasks};