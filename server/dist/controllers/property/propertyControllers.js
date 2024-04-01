var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PropertyService from "../../services/PropertyServices.js";
import ActivityService from "../../services/ActivityService.js";
let addProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const accountId = req.header('accountId');
        const jwtDecoded = req.jwtDecoded;
        const propertyServce = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
        const propertyId = yield propertyServce.addProperty(Object.assign({}, body.data));
        yield ActivityService.addActivity('created a property', jwtDecoded.id, { propertyId: propertyId }, req.accountId);
        if (propertyId > 0)
            res.status(200).json({ id: propertyId });
        else
            res.status(400).end();
    }
    catch (err) {
        next(err);
    }
});
let addFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = req.body.propertyId;
    const jwtDecoded = req.jwtDecoded;
    if (req.files) {
        let photos = req.files;
        let propertyService = new PropertyService(req.accountId, jwtDecoded.id, req.isAdmin);
        let err = yield propertyService.saveFiles(photos, propertyId);
        yield ActivityService.addActivity('added files', jwtDecoded.id, { propertyId: propertyId }, req.accountId);
        res.json(err);
    }
    else {
        res.status(400).json({ 'error': 'No images provided.' });
    }
});
let viewImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let propertyId = String(req.query.propertyId);
        if (propertyId) {
            let propertyService = new PropertyService(req.accountId, req.jwtDecoded.id, req.isAdmin);
            let images = yield propertyService.getFilesByProperty(propertyId, true);
            res.status(200).json(images);
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
        let propertyId = String(req.query.propertyId);
        if (propertyId) {
            let propertyService = new PropertyService(req.accountId, req.jwtDecoded.id, req.isAdmin);
            let images = yield propertyService.getFilesByProperty(propertyId, false);
            res.status(200).json(images);
        }
        else {
            next(new Error('No property id provided'));
        }
    }
    catch (err) {
        res.status(400).end();
    }
});
let updateProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const jwtDecoded = req.jwtDecoded;
        const accountId = req.header('accountId');
        const propertyId = body.propertyId;
        const dataTbu = body.update;
        const propertyService = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
        let updated = propertyService.updateProperty(propertyId, dataTbu);
        yield ActivityService.addActivity('updated a property', jwtDecoded.id, { propertyId: propertyId }, req.accountId);
        if (updated)
            res.status(200).end();
        else
            res.status(400).end();
    }
    catch (err) {
        next(err);
    }
});
let deleteProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.propertyId) {
            const propertyId = req.params.propertyId;
            const accountId = req.accountId;
            const jwtDecoded = req.jwtDecoded;
            const propertyService = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
            let deleted = yield propertyService.deleteProperty(propertyId);
            if (deleted)
                res.status(200).end();
            else
                res.status(400);
        }
        else {
            res.status(401).end();
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
let getProperties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.header('accountId');
        const userId = req.query.userId;
        const propertyServce = new PropertyService(accountId, String(userId), false);
        res.status(200).json(yield propertyServce.getProperties());
    }
    catch (err) {
        next(err);
    }
});
let viewProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.query.propertyId;
        console.log(propertyId);
        const propertyService = new PropertyService(accountId, userId, false);
        let property = yield propertyService.getProperty(Number(propertyId));
        res.status(200).json(property);
    }
    catch (err) {
        res.status(400).end();
    }
});
let viewTenants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.query.propertyId;
        const propertyService = new PropertyService(accountId, userId, false);
        let tenants = yield propertyService.getTenantsAssociated(Number(propertyId));
        res.status(200).json(tenants);
    }
    catch (err) {
        res.status(400).end();
    }
});
let addNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.params.propertyId;
        const note = req.body.note;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        yield ActivityService.addActivity('added a note', userId, { propertyId: propertyId }, req.accountId);
        yield propertyService.addNote(propertyId, note, userId, new Date());
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
        const propertyId = req.params.propertyId;
        const task = req.body.task;
        const deadline = req.body.deadline;
        const calendar = req.body.calendar;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        yield ActivityService.addActivity('added a task', userId, { propertyId: propertyId }, req.accountId);
        yield propertyService.addTask(propertyId, task, deadline, userId, calendar);
        res.status(200).end();
    }
    catch (err) {
        res.status(400).end();
    }
});
let getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyId = req.params.propertyId;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        let notes = yield propertyService.getNotes(propertyId);
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
        const propertyId = req.params.propertyId;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        let tasks = yield propertyService.getTasks(propertyId);
        res.json(tasks);
    }
    catch (err) {
        res.status(400).end();
    }
});
let getAllNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.accountId;
        const userId = req.jwtDecoded.id;
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        const allNotes = yield propertyService.getAllNotes();
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
        const propertyService = new PropertyService(accountId, userId, req.isAdmin);
        const allNotes = yield propertyService.getAllTasks();
        res.json(allNotes);
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
        const propertyServce = new PropertyService(accountId, userId, req.isAdmin);
        yield propertyServce.completeTask(String(taskId));
        res.status(200).end();
    }
    catch (err) {
        res.status(400).end();
    }
});
export { addProperty, addFiles, viewImages, viewFiles, updateProperty, deleteProperty, getProperties, viewProperty, viewTenants, addNote, addTask, getNotes, getTasks, completeTask, getAllNotes, getAllTasks };
//# sourceMappingURL=propertyControllers.js.map