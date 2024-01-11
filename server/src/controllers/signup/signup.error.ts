import { Request, Response } from "express";

export default function handleErr(err: Error, req: Request, res: Response, next) {
    if(res.headersSent) {
        next(err);
    } else {
        res.status(400).json({message: err.message});
    }
}