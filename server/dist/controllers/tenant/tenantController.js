var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TenantService from "../../services/TenantService.js";
import ActivityService from "../../services/ActivityService.js";
let addTenant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.header('accountId');
        if (body && accountId) {
            let tenantService = new TenantService(accountId, jwtDecoded.id);
            let id = yield tenantService.addTenant(Object.assign({ accountId }, body));
            yield ActivityService.addActivity('created a tenant', jwtDecoded.id, { tenantId: id }, accountId);
            if (id < 0)
                res.status(400).end();
            else
                res.status(200).json({ tenantId: id });
        }
        else {
            res.status(400).json({ message: 'Missing required field.' });
        }
    }
    catch (err) {
        res.status(400).end();
    }
});
let updateTenant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { tenantId, update } = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.accountId;
        const tenantService = new TenantService(accountId, jwtDecoded.id);
        yield ActivityService.addActivity('updated a tenant', jwtDecoded.id, { tenantId: tenantId }, accountId);
        yield tenantService.updateTenant(tenantId, update);
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).end();
    }
});
let deleteTenant = (req, res, next) => {
    try {
        let jwtDecoded = req.jwtDecoded;
        let tenantId = req.params.tenantId;
        let accountId = req.accountId;
        let tenantService = new TenantService(accountId, jwtDecoded.id);
        tenantService.deleteTenant(tenantId);
        res.status(200).end();
    }
    catch (err) {
        res.status(400).end();
    }
};
let viewTenant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.accountId;
        let tenantId = req.query.tenantId;
        let tenantService = new TenantService(accountId, jwtDecoded.id);
        res.status(200).json(yield tenantService.viewTenant(String(tenantId)));
    }
    catch (err) {
        res.status(400).end();
    }
});
let viewAllTenants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.jwtDecoded.id;
        let tenantService = new TenantService(req.accountId, userId);
        res.status(200).json(yield tenantService.viewAllTenants());
    }
    catch (err) {
        res.status(400).end();
    }
});
let uploadFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tenantId = req.body.tenantId;
        let files = req.files;
        let tenantService = new TenantService(req.accountId, req.jwtDecoded.id);
        console.log(tenantId);
        yield tenantService.saveFiles(tenantId, files);
        res.status(200).end();
    }
    catch (err) {
        res.status(400).end();
    }
});
let addProfileImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.body.tenantId;
    const jwtDecoded = req.jwtDecoded;
    if (req.file && (req.file.mimetype.startsWith('image')) && tenantId) {
        let photo = req.file;
        let tenantService = new TenantService(req.accountId, jwtDecoded.id);
        console.log(photo);
        let added = yield tenantService.addPfp(tenantId, photo);
        if (!added) {
            res.status(400).json({ 'error': 'Error uploading image' });
        }
        else {
            res.status(200).end();
            yield ActivityService.addActivity('added a profile image', jwtDecoded.id, { tenantId: tenantId }, req.accountId);
        }
    }
    else {
        res.status(500).json({ 'error': 'Error' });
    }
});
let viewProfileImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tenantId = String(req.query.tenantId);
        if (tenantId) {
            let tenantService = new TenantService();
            let photo = yield tenantService.getPfp(tenantId);
            const mimeType = photo.mime;
            let file = photo.file;
            res.setHeader('Content-Type', mimeType);
            res.send(file).end();
        }
        else {
            next(new Error('No property id provided'));
        }
    }
    catch (err) {
        res.status(400).end();
    }
});
let viewFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tenantId = String(req.query.tenantId);
        if (tenantId) {
            let tenantService = new TenantService(req.accountId, req.jwtDecoded.id);
            let files = yield tenantService.getFilesByTenant(tenantId, false);
            res.status(200).json(files);
        }
        else {
            next(new Error('No property id provided'));
        }
    }
    catch (err) {
        res.status(400).end();
    }
});
let addNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const note = req.body.note;
        const tenantService = new TenantService(accountId, userId);
        yield tenantService.addNote(tenantId, note, userId, new Date());
        yield ActivityService.addActivity('added a note', userId, { tenantId: tenantId }, accountId);
        res.status(200).end();
    }
    catch (err) {
        res.status(400).end();
    }
});
let addTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const task = req.body.task;
        const deadline = req.body.deadline;
        const calendar = req.body.calendar;
        const tenantService = new TenantService(accountId, userId);
        yield ActivityService.addActivity('added a task', userId, { tenantId: tenantId }, accountId);
        yield tenantService.addTask(tenantId, task, deadline, userId, calendar);
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.status(400).end();
    }
});
let getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const tenantService = new TenantService(accountId, userId);
        let notes = yield tenantService.getNotes(tenantId);
        res.json(notes);
    }
    catch (err) {
        res.status(400).end();
    }
});
let getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantId = req.params.tenantId;
        const tenantService = new TenantService(accountId, userId);
        let tasks = yield tenantService.getTasks(tenantId);
        res.json(tasks);
    }
    catch (err) {
        res.status(400).end();
    }
});
let completeTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const taskId = req.query.taskId;
        const tenantService = new TenantService(accountId, userId);
        yield tenantService.completeTask(String(taskId));
        res.status(200).end();
    }
    catch (err) {
        res.status(400).end();
    }
});
let getAllNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantService = new TenantService(accountId, userId);
        const allNotes = yield tenantService.getAllNotes();
        res.json(allNotes);
    }
    catch (err) {
        res.status(400).end();
    }
});
let getAllTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const tenantService = new TenantService(accountId, userId);
        const allNotes = yield tenantService.getAllTasks();
        res.json(allNotes);
    }
    catch (err) {
        res.status(400).end();
    }
});
export { addTenant, updateTenant, deleteTenant, viewTenant, viewAllTenants, addProfileImage, viewProfileImage, uploadFiles, viewFiles, addNote, addTask, getNotes, getTasks, completeTask, getAllNotes, getAllTasks };
//# sourceMappingURL=tenantController.js.map