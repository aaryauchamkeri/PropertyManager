import { Response } from "express"
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js"



let propertyErr = (err: Error, req: RequestWithIdAdmin, res: Response, next) => {
    if(res.headersSent) {
        console.log(err);
        next(err);
    } else {
        console.log(err);
        res.status(400).json({message: err.message});
    }
}

export {propertyErr}