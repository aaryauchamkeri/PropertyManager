import { Response } from "express";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import { remDbConDynamic } from "../../database/connection.js";



let getAllActivity = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let activity = await remDbConDynamic('activity')
                            .innerJoin('users', 'users.id', '=', 'activity.userId')
                            .where(
        {
            accountId: req.accountId
        });
        res.json(activity);
    } catch (err) {
        res.status(400).end();
    }
}

let getActivityByTenant = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let activity = await remDbConDynamic('activity')
                            .innerJoin('users', 'users.id', '=', 'activity.userId')
                            .where(
        {
            tenantId: req.query.tenantId,
            accountId: req.accountId
        });
        res.json(activity);
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
}

let getActivityByProperty = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let activity = await remDbConDynamic('activity')
                            .innerJoin('users', 'users.id', '=', 'activity.userId')
                            .where(
        {
            propertyId: req.query.propertyId,
            accountId: req.accountId
        });
        res.json(activity);
    } catch (err) {
        console.log(err);
        res.status(400).end();
    }
}


export {getAllActivity, getActivityByTenant, getActivityByProperty};