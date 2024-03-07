import { randomUUID } from "crypto";
import { remDbConDynamic } from "../database/connection.js";
import { EventService } from "./EventService.js";

export default class PropertyService {

    admin: boolean;
    accountId: string;
    userId: string;
        
    constructor(accountId: string, userId: string, admin: boolean) {
        this.accountId = accountId;
        this.userId = userId;
        this.admin = admin;
    }
    
    async checkAccountPropertyPermission(propertyId: string): Promise<boolean> {
        const results = await remDbConDynamic('properties')
                                .join('accounts', 'properties.accountId', '=', 'accounts.id')
                                .where({
                                    'properties.id': propertyId
                                });
        if(results.length > 0) {
            return true;
        }
        return false;
    }
    
    async checkAvaliableProperties() {
        const avaliable = await remDbConDynamic('accounts').select('units').where({
            accountId: this.accountId
        });
        return avaliable[0].units;
    }

    async addProperty({name, address, ...otherInfo}): Promise<number> {
        if(this.admin) {
            let insertResponse = await remDbConDynamic('properties').insert({
                accountId: this.accountId,
                name: name,
                address: address,
                ...otherInfo
            }).returning('id');
            return insertResponse[0];
        } else {
            return -1;
        }
    }

    async updateProperty(propertyId: string, data: any): Promise<boolean> {
        let permissionGranted:boolean = await this.checkAccountPropertyPermission(propertyId);
        if (permissionGranted){
            if(data.id) {
                delete data.id;
            } else if(data.accountId) {
                delete data.accountId;
            }
            let qResult = await remDbConDynamic('properties')
                                .update({...data})
                                .where({id: propertyId});
            return true;
        } else {
            return false;
        }
    }

    async deleteProperty(propertyId: string): Promise<boolean> {
        let permission = await this.checkAccountPropertyPermission(propertyId);
        if(permission) {
            // Work on removing associated files
            if(await this.removeAssociatedTenants(propertyId) && 
               await this.removeAssociatedFiles(propertyId)) {
                await remDbConDynamic('properties').delete()
                    .where({
                        id: propertyId,
                    });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async removeAssociatedTenants(propertyId: string): Promise<boolean> {
        try {
            let res = await remDbConDynamic('tenants').update({
                propertyId: null
            }).where({
                propertyId: propertyId
            });
            return true;
        } catch (err) {
            return false;
        }
    }

    async removeAssociatedFiles(propertyid: string): Promise<boolean> {
        try {
            let res = await remDbConDynamic('files').delete().where({
                propertyId: propertyid
            });
            return true;
        } catch(err) {
            return false;
        }
    }

    async getProperties(): Promise<any> {
        let propertiesWithTenants = [];
        let results = await remDbConDynamic('properties').select('*')
                            .where({
                                accountId: this.accountId
                            });
        return results;
    }

    async getProperty(propertyId: number): Promise<any> {
        let results = await remDbConDynamic('properties').select('*')
                            .where({
                                id: propertyId
                            });
        return results[0];
    }

    async getTenantsAssociated(propertyId: number): Promise<any> {
        let results = await remDbConDynamic('tenants').select('*')
                            .where({
                                propertyId: propertyId
                            });
        return results;
    }

    async saveImages(photos: any, propertyId: string): Promise<boolean> {
        try {
            let noerr = true;
            this.checkAccountPropertyPermission(propertyId);
            photos.forEach(async (image: any) => {
                let fileId: string = randomUUID();
                const buffer = image.buffer;
                await remDbConDynamic('files').insert({
                    id: fileId,
                    file: buffer,
                    fileName: image.originalname,
                    mime: image.mimetype,
                    propertyId: propertyId,
                    accountId: this.accountId
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    noerr = false;
                });
            });
            
            return noerr;
            // remDbConDynamic('files').insert( )
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async getFilesByProperty(propertyId: string, images: boolean = false) {
        this.checkAccountPropertyPermission(propertyId);
        let files;
        if(!images) {
            files = await remDbConDynamic('files').select('id', 'mime').where({
                propertyId: propertyId
            });
        } else {
            files = await remDbConDynamic('files').select('id', 'mime').where({
                propertyId: propertyId,
                mime: 'image/png'
            }).orWhere({
                propertyId: propertyId,
                mime: 'image/jpeg'
            });
        }

        return files;
    }

    async addNote(propertyId: string, note: string, author: string, created: Date): Promise<boolean> {
        try {
            this.checkAccountPropertyPermission(propertyId);
            let res = await remDbConDynamic('property_notes').insert({
                note: note,
                propertyId: propertyId,
                userId: author,
                created: created
            });
            return true;
        } catch(err) {
            return false;
        }
    }

    async addTask(propertyId: string, task: string, deadline: Date, author: string, calendar: boolean): Promise<boolean> {
        try {
            this.checkAccountPropertyPermission(propertyId);
            let res = await remDbConDynamic('property_tasks').insert({
                task: task,
                deadline: deadline,
                propertyId: propertyId,
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

    async getNotes(propertyId: string) {
        try {
            this.checkAccountPropertyPermission(propertyId);
            const notes = await remDbConDynamic('property_notes').select('*').where({
                propertyId: propertyId
            });

            return notes;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async getTasks(propertyId: string) {
        try {
            this.checkAccountPropertyPermission(propertyId);
            const tasks = await remDbConDynamic('property_tasks')
            .select(['property_tasks.deadline', 'property_tasks.task', 'users.first_name', 
                     'users.last_name', 'users.username'])
            .where({
                propertyId: propertyId
            }).innerJoin(
                'users',
                'property_tasks.userId',
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
            const notes = await remDbConDynamic('property_tasks').select('*')
            .innerJoin(
                'properties',
                'propert_tasks.propertyId',
                '=',
                'properties.id'
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
            const notes = await remDbConDynamic('property_notes').select('*')
            .innerJoin(
                'properties',
                'property_notes.propertyId',
                '=',
                'properties.id'
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