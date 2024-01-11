import { remDbConDynamic } from "../database/connection.js";

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

    async addProperty({name, address, ...otherInfo}): Promise<boolean> {
        if(this.admin) {
            let insertResponse = await remDbConDynamic('properties').insert({
                accountId: this.accountId,
                name: name,
                address: address,
                ...otherInfo
            });
            return true;
        } else {
            return false;
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
            await remDbConDynamic('properties').delete()
                .where({
                    id: propertyId,
                });
            return true;
        } else {
            return false;
        }
    }

    async getProperties(): Promise<any> {
        let results = await remDbConDynamic('properties').select('*')
                            .where({
                                accountId: this.accountId
                            });
        return results;
    }
}