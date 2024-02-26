import { Response } from "express";
import { RequestWithId } from "../authentication/jwtMiddleware.js";
import { remDbConDynamic } from "../../database/connection.js";


interface RequestWithIdAdmin extends RequestWithId {
    isAdmin: boolean,
    accountId: string
}

const checkAccountAccess = async (req: RequestWithIdAdmin, res: Response, next) => {
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
            req.accountId = accountId;
            next();
        } else {
            res.status(401).json({message: 'no account id present'});
        }
    } else {
        res.status(400).end();
    }
}

export {checkAccountAccess, RequestWithIdAdmin};