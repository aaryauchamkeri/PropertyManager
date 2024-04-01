var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { randomUUID } from "crypto";
import { remDbConDynamic } from "../database/connection.js";
import { EventService } from "./EventService.js";
export default class PropertyService {
    constructor(accountId, userId, admin) {
        this.accountId = accountId;
        this.userId = userId;
        this.admin = admin;
    }
    checkAccountPropertyPermission(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield remDbConDynamic('properties')
                .join('accounts', 'properties.accountId', '=', 'accounts.id')
                .where({
                'properties.id': propertyId
            });
            if (results.length > 0) {
                return true;
            }
            return false;
        });
    }
    checkAvaliableProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            const avaliable = yield remDbConDynamic('accounts').select('units').where({
                accountId: this.accountId
            });
            return avaliable[0].units;
        });
    }
    addProperty(_a) {
        var { name, address } = _a, otherInfo = __rest(_a, ["name", "address"]);
        return __awaiter(this, void 0, void 0, function* () {
            if (this.admin) {
                let insertResponse = yield remDbConDynamic('properties').insert(Object.assign({ accountId: this.accountId, name: name, address: address }, otherInfo)).returning('id');
                return insertResponse[0];
            }
            else {
                return -1;
            }
        });
    }
    updateProperty(propertyId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionGranted = yield this.checkAccountPropertyPermission(propertyId);
            if (permissionGranted) {
                if (data.id) {
                    delete data.id;
                }
                else if (data.accountId) {
                    delete data.accountId;
                }
                let qResult = yield remDbConDynamic('properties')
                    .update(Object.assign({}, data))
                    .where({ id: propertyId });
                return true;
            }
            else {
                return false;
            }
        });
    }
    deleteProperty(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            let permission = yield this.checkAccountPropertyPermission(propertyId);
            if (permission) {
                this.removeAssociatedNotesTasksLeasesActivity(propertyId).then(res => {
                    remDbConDynamic('properties').delete()
                        .where({
                        id: propertyId
                    }).catch(err => {
                        console.log(err);
                    });
                });
                return true;
            }
            else {
                return false;
            }
        });
    }
    removeAssociatedNotesTasksLeasesActivity(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield remDbConDynamic('property_notes').delete()
                    .where({
                    propertyId: propertyId
                });
                yield remDbConDynamic('property_tasks').delete()
                    .where({
                    propertyId: propertyId
                });
                yield remDbConDynamic('leases').delete()
                    .where({
                    propertyId: propertyId
                });
                yield remDbConDynamic('activity').delete()
                    .where({
                    propertyId: propertyId
                });
                yield remDbConDynamic('files').delete()
                    .where({
                    propertyId: propertyId
                });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            let propertiesWithTenants = [];
            let results = yield remDbConDynamic('properties').select('*')
                .where({
                accountId: this.accountId
            });
            return results;
        });
    }
    getProperty(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield remDbConDynamic('properties').select('*')
                .where({
                id: propertyId
            });
            return results[0];
        });
    }
    getTenantsAssociated(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield remDbConDynamic('tenants').select('*')
                .where({
                propertyId: propertyId
            });
            return results;
        });
    }
    saveFiles(files, propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let noerr = true;
                this.checkAccountPropertyPermission(propertyId);
                files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                    let fileId = randomUUID();
                    const buffer = file.buffer;
                    yield remDbConDynamic('files').insert({
                        id: fileId,
                        file: buffer,
                        fileName: file.originalname,
                        mime: file.mimetype,
                        propertyId: propertyId,
                        accountId: this.accountId
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        noerr = false;
                    });
                }));
                return noerr;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getFilesByProperty(propertyId, images = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAccountPropertyPermission(propertyId);
            let files;
            if (!images) {
                files = yield remDbConDynamic('files').select('id', 'mime', 'fileName').where({
                    propertyId: propertyId
                });
            }
            else {
                files = yield remDbConDynamic('files').select('id', 'mime', 'fileName').where({
                    propertyId: propertyId,
                    mime: 'image/png'
                }).orWhere({
                    propertyId: propertyId,
                    mime: 'image/jpeg'
                });
            }
            return files;
        });
    }
    addNote(propertyId, note, author, created) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkAccountPropertyPermission(propertyId);
                let res = yield remDbConDynamic('property_notes').insert({
                    note: note,
                    propertyId: propertyId,
                    userId: author,
                    created: created
                });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    addTask(propertyId, task, deadline, author, calendar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkAccountPropertyPermission(propertyId);
                let res = yield remDbConDynamic('property_tasks').insert({
                    task: task,
                    deadline: deadline,
                    propertyId: propertyId,
                    userId: author
                });
                if (calendar) {
                    yield new EventService(Number(this.accountId)).addEvent(deadline, task, '');
                }
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    getNotes(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkAccountPropertyPermission(propertyId);
                const notes = yield remDbConDynamic('property_notes').select('*').where({
                    propertyId: propertyId
                });
                return notes;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    completeTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield remDbConDynamic('property_tasks').update({
                completed: true
            }).where({
                id: taskId
            });
            return true;
        });
    }
    getTasks(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkAccountPropertyPermission(propertyId);
                const tasks = yield remDbConDynamic('property_tasks')
                    .select(['property_tasks.*', 'users.first_name', 'users.last_name', 'users.username'])
                    .where({
                    propertyId: propertyId
                }).innerJoin('users', 'property_tasks.userId', '=', 'users.id');
                return tasks;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield remDbConDynamic('property_tasks').select('property_tasks.*', 'properties.id', 'properties.accountId')
                    .innerJoin('properties', 'property_tasks.propertyId', '=', 'properties.id').where({
                    accountId: this.accountId
                });
                return notes;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield remDbConDynamic('property_tasks').select('*')
                    .innerJoin('properties', 'property_tasks.propertyId', '=', 'properties.id').where({
                    accountId: this.accountId
                });
                console.log('called');
                console.log(notes);
                return notes;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
//# sourceMappingURL=PropertyServices.js.map