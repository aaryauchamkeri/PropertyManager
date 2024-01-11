import { remDbConDynamic } from "../database/connection.js";

export default class TenantService {
    accountId: string;
    propertyId: string;
    userId: string;

    constructor (accountId: string, userId: string) {
        this.accountId = accountId;
        this.userId = userId;
    }

    async checkAccountPropertyPermission(propertyId: number): Promise<boolean> {
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

    async addTenant(data: any): Promise<number> {
        if(data.propertyId) {
            let permission = await this.checkAccountPropertyPermission(data.propertyId);
            if(permission) {
                let [id] = await remDbConDynamic('tenants').insert({
                    ...data
                });
                return id;
            }
            return -1;
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
}