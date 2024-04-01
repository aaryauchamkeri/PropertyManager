var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { remDbConDynamic } from "../database/connection.js";
import { randomUUID } from "crypto";
import { EventService } from "./EventService.js";
export default class TenantService {
    constructor(accountId, userId) {
        this.accountId = accountId;
        this.userId = userId;
    }
    checkAccountTenantPermission(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield remDbConDynamic('tenants')
                .join('accounts', 'tenants.accountId', '=', 'accounts.id')
                .where({
                'tenants.id': tenantId
            });
            if (results.length > 0) {
                return true;
            }
            return false;
        });
    }
    addTenant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.propertyId) {
                if (true) {
                    let [id] = yield remDbConDynamic('tenants').insert(Object.assign({}, data));
                    return id;
                }
            }
            else {
                let [id] = yield remDbConDynamic('tenants').insert(Object.assign({}, data));
                return id;
            }
        });
    }
    deleteTenant(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.removeAssociatedFiles(tenantId).then(res => {
                this.removeAssociatedNotesTasksLeasesActivity(tenantId).then(res => {
                    remDbConDynamic('tenants').delete()
                        .where({
                        id: tenantId
                    }).catch(err => {
                        console.log(err);
                    });
                });
            });
            return true;
        });
    }
    removeAssociatedNotesTasksLeasesActivity(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield remDbConDynamic('tenant_notes').delete()
                    .where({
                    tenantId
                });
                yield remDbConDynamic('tenant_tasks').delete()
                    .where({
                    tenantId
                });
                yield remDbConDynamic('leases').delete()
                    .where({
                    tenantId
                });
                yield remDbConDynamic('activity').delete()
                    .where({
                    tenantId
                });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    removeAssociatedFiles(propertyid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield remDbConDynamic('files').delete().where({
                    propertyId: propertyid
                });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    updateTenant(tenantId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.id) {
                delete data.id;
            }
            if (data.accountId) {
                delete data.accountId;
            }
            let result = yield remDbConDynamic('tenants').update(Object.assign({}, data)).where({ id: tenantId });
            return true;
        });
    }
    viewTenant(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let permission = yield this.checkAccountTenantPermission(tenantId);
            if (!permission)
                throw new Error("Unauthorized");
            else {
                let results = yield remDbConDynamic('tenants').select('*')
                    .where({
                    id: tenantId
                });
                return results[0];
            }
        });
    }
    viewAllTenants() {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield remDbConDynamic('tenants').select('*')
                .where({
                accountId: this.accountId
            });
            return results;
        });
    }
    saveFiles(tenantId, files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                files.forEach(file => {
                    let fileId = randomUUID();
                    const buffer = file.buffer;
                    remDbConDynamic('files').insert({
                        id: fileId,
                        file: buffer,
                        fileName: file.originalname,
                        mime: file.mimetype,
                        tenantId: tenantId,
                        accountId: this.accountId
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        throw new Error(`Error saving images to database`);
                    });
                });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getFilesByTenant(tenantId, images = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let files;
            if (!images) {
                this.checkAccountTenantPermission(tenantId);
                files = yield remDbConDynamic('files').select('id', 'mime', 'fileName').where({
                    tenantId: tenantId
                });
            }
            else {
                files = yield remDbConDynamic('files').select('id', 'mime', 'fileName').where({
                    tenantId: tenantId,
                    mime: 'image/png'
                }).orWhere({
                    tenantId: tenantId,
                    mime: 'image/jpeg'
                });
            }
            return files;
        });
    }
    addNote(tenantId, note, author, created) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkAccountTenantPermission(tenantId);
                let res = yield remDbConDynamic('tenant_notes').insert({
                    note: note,
                    tenantId: tenantId,
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
    addTask(tenantId, task, deadline, author, calendar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkAccountTenantPermission(tenantId);
                let res = yield remDbConDynamic('tenant_tasks').insert({
                    task: task,
                    deadline: deadline,
                    tenantId: tenantId,
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
    completeTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield remDbConDynamic('tenant_tasks').update({
                    completed: true
                }).where({
                    id: taskId
                });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    addPfp(tenantId, photo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uuid = randomUUID();
                yield remDbConDynamic('files').insert({
                    id: uuid,
                    file: photo.buffer,
                    fileName: photo.originalname,
                    mime: photo.mimetype,
                    accountId: this.accountId
                });
                yield remDbConDynamic('tenant_picture').insert({
                    tenantId: tenantId,
                    fileId: uuid
                });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getPfp(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let profileImageId = yield remDbConDynamic('tenant_picture')
                    .select('fileId')
                    .where({
                    tenantId: tenantId
                });
                let photo = yield remDbConDynamic('files')
                    .where({
                    id: profileImageId[0].fileId
                });
                return photo[0];
            }
            catch (err) {
                return false;
            }
        });
    }
    getNotes(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield remDbConDynamic('tenant_notes').select('*').where({
                    tenantId: tenantId
                });
                return notes;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getTasks(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield remDbConDynamic('tenant_tasks')
                    .select(['tenant_tasks.*', 'users.first_name', 'users.last_name', 'users.username'])
                    .where({
                    tenantId: tenantId
                }).innerJoin('users', 'tenant_tasks.userId', '=', 'users.id');
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
                const notes = yield remDbConDynamic('tenant_notes').select('*')
                    .innerJoin('tenants', 'tenant_notes.tenantId', '=', 'tenants.id').where({
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
                const notes = yield remDbConDynamic('tenant_tasks').select('*')
                    .innerJoin('tenants', 'tenant_tasks.tenantId', '=', 'tenants.id').where({
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
}
//# sourceMappingURL=TenantService.js.map