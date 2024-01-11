import { Request, Response } from "express";



let tenantErr = (err: Error, req: Request, res: Response, next) => {
    if(res.headersSent) {
        next(err);
    } else {
        res.status(400).json(err);
    }
}

export {tenantErr};