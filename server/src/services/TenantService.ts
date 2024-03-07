import { remDbConDynamic } from "../database/connection.js";
import { randomUUID } from "crypto";
import { EventService } from "./EventService.js";
export default class TenantService {
    accountId: string;
    propertyId: string;
    userId: string;

    constructor (accountId: string, userId: string) {
        this.accountId = accountId;
        this.userId = userId;
    }

    async checkAccountTenantPermission(tenantId: string): Promise<boolean> {
        const results = await remDbConDynamic('tenants')
                        .join('accounts', 'tenants.accountId', '=', 'accounts.id')
                        .where({
                            'tenants.id': tenantId
                        });
        if(results.length > 0) {
            return true;
        }
        return false;
    }

    async addTenant(data: any): Promise<number> {
        if(data.propertyId) {
            if(true) {
                let [id] = await remDbConDynamic('tenants').insert({
                    ...data
                });
                return id;
            }
        } else {
            let [id] = await remDbConDynamic('tenants').insert({
                ...data
            });
            return id;
        }
    }

    async deleteTenant(tenantId: string): Promise<boolean> {
        let result = await remDbConDynamic('tenants').delete()
                            .where({id: tenantId});
        return true;
    }

    async updateTenant(tenantId: string, data: any): Promise<boolean> {
        if(data.id) {
            delete data.id;
        }
        let result = await remDbConDynamic('tenants').update({
            ...data
        }).where({id: tenantId});
        return true;
    }

    async viewTenant(tenantId: string) {
        let permission = await this.checkAccountTenantPermission(tenantId);
        if(!permission) throw new Error("Unauthorized");
        else {
            let results = await remDbConDynamic('tenants').select('*')
                    .where({
                        id: tenantId
                    });
            return results[0];
        }
    }

    async viewAllTenants() {
        let results = await remDbConDynamic('tenants').select('*')
                .where({
                    accountId: this.accountId
                });
        return results;
    }

    async saveFiles(tenantId: string, files: any) {
        try {
            files.forEach(async file => {
                let fileId: string = randomUUID();
                const buffer = file.buffer;
                await remDbConDynamic('files').insert({
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
            // remDbConDynamic('files').insert( )
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async getFilesByTenant(tenantId: string, images: boolean = false) {
        let files;
        if(!images) {
            this.checkAccountTenantPermission(tenantId);
            files = await remDbConDynamic('files').select('id', 'mime').where({
                tenantId: tenantId
            });
        } else {
            files = await remDbConDynamic('files').select('id', 'mime').where({
                tenantId: tenantId,
                mime: 'image/png'
            }).orWhere({
                tenantId: tenantId,
                mime: 'image/jpeg'
            });
        }

        return files;
    }

    async addNote(tenantId: string, note: string, author: string, created: Date): Promise<boolean> {
        try {
            this.checkAccountTenantPermission(tenantId);
            let res = await remDbConDynamic('tenant_notes').insert({
                note: note,
                tenantId: tenantId,
                userId: author,
                created: created
            });
            return true;
        } catch(err) {
            return false;
        }
    }

    async addTask(tenantId: string, task: string, deadline: Date, author: string, calendar: boolean): Promise<boolean> {
        try {
            console.log('addtask tenant called');
            this.checkAccountTenantPermission(tenantId);
            let res = await remDbConDynamic('tenant_tasks').insert({
                task: task,
                deadline: deadline,
                tenantId: tenantId,
                userId: author
            });

            if(calendar) {
                await new EventService(Number(this.accountId)).addEvent(deadline, task, '');
            }
            return true;
        } catch(err) {
            return false;
        }
    }

    async getNotes(tenantId: string) {
        try {
            const notes = await remDbConDynamic('tenant_notes').select('*').where({
                tenantId: tenantId
            });

            return notes;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async getTasks(tenantId: string) {
        try {
            const tasks = await remDbConDynamic('tenant_tasks')
            .select(['tenant_tasks.deadline', 'tenant_tasks.task', 'users.first_name', 
                     'users.last_name', 'users.username'])
            .where({
                tenantId: tenantId
            }).innerJoin(
                'users',
                'tenant_tasks.userId',
                '=',
                'users.id'
            );
            return tasks;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async getAllNotes() {
        try {
            const notes = await remDbConDynamic('tenant_notes').select('*')
            .innerJoin(
                'tenants',
                'tenant_notes.tenantId',
                '=',
                'tenants.id'
            ).where({
                accountId: this.accountId
            });
            return notes;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async getAllTasks() {
        try {
            const notes = await remDbConDynamic('tenant_tasks').select('*')
            .innerJoin(
                'tenants',
                'tenant_tasks.tenantId',
                '=',
                'tenants.id'
            ).where({
                accountId: this.accountId
            });
            return notes;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}