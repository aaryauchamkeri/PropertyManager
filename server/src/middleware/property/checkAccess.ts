import { Response } from "express";
import { ExtendedRequest } from "../authentication/jwtMiddleware.js";
import { remDbCon } from "../../database/connection.js";


const checkAccessToAccount = (req: ExtendedRequest, res: Response, next) => {
    const body = req.body;
    const userInfo = req.jwtDecoded;
    const accountId = body.accountId;
    if(!body) {
        next();
    } else if(!accountId) {
        res.status(400).json({message: 'No account id provided'});
    } else {
        remDbCon.query('SELECT * FROM account_users WHERE accountId = ? AND userId = ?',
            [accountId, userInfo.id],
            (err, results: Array<any>) => {
                if(err) {
                    console.log(err.code);
                    res.status(400).end();
                } else if(results.length > 0) {
                    next();
                }
            }
        );
    }
}


export {checkAccessToAccount};