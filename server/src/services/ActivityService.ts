import { remDbConDynamic } from "../database/connection.js";


export default class ActivityService {
    constructor() {

    }

    static async addActivity(message: string, userId: string, {propertyId = null, tenantId = null},
                             accountId) {
        if(propertyId) {
            await remDbConDynamic('activity').insert(
                {
                    message,
                    userId,
                    propertyId,
                    created: new Date(),
                    accountId: accountId
                }
            );
        } else if(tenantId) {
            await remDbConDynamic('activity').insert(
                {
                    message,
                    userId,
                    tenantId,
                    created: new Date(),
                    accountId: accountId
                }
            );
        }
    }
}
