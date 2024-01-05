import { Response } from "express";
import { ExtendedRequest } from "../authentication/jwtMiddleware.js";
import { remDbConDynamic } from "../../database/connection.js";


interface ExtendedRequestAdmin extends ExtendedRequest {
    isAdmin: boolean
}

const checkAccountAccess = async (req: ExtendedRequestAdmin, res: Response, next) => {
    const userInfo = req.jwtDecoded;
    const userId: string = userInfo.id;
    const accountId = req.header('accountId');
    if(accountId) {
        let resultSet = await remDbConDynamic('account_users').where({
            accountId: accountId,
            userId: userId
        });
        if(resultSet.length > 0) {
            if(resultSet[0].isAdmin) {
                req.isAdmin = true;
            } else {
                req.isAdmin = false;
            }
            next();
        } else {
            res.status(401).end({message: 'unauthorized'});
        }
    } else {
        res.status(400).end();
    }
}

export {checkAccountAccess, ExtendedRequestAdmin};