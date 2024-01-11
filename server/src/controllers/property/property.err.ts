import { Response } from "express"
import { ExtendedRequestAdmin } from "../../middleware/property/verifyAccess.js"



let propertyErr = (err: Error, req: ExtendedRequestAdmin, res: Response, next) => {
    if(res.headersSent) {
        next(err);
    } else {
        res.status(400).json({message: err.message});
    }
}

export {propertyErr}