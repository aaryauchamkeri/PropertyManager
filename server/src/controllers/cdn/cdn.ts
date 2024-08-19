import { Request, Response } from "express";
import { remDbConDynamic } from "../../database/connection.js";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import { randomUUID } from "crypto";

let getFile = async (req: Request, res: Response, next) => {
    const fileName = req.params.name;
    let fileNameIndexed = fileName.split('.');
    try {
        let files = await remDbConDynamic('files').select('file', 'mime').where({
            id: fileNameIndexed[0]
        });
        let firstResponse = files[0];
        const mimeType = firstResponse.mime;
        let file = firstResponse.file;
        res.setHeader('Content-Type', mimeType);
        res.send(file).end();
    } catch(err) {
        next(err);
    }
}

let getTemplates = async (req: RequestWithIdAdmin, res: Response) => {
    const accountId = req.accountId;
    try {
        let files = await remDbConDynamic('files').select("*")
            .where({
                accountId: accountId,
                isTemplate: true
            });
        res.json(files);
    } catch (err) {
        res.status(400).end();
    }
}

let uploadTemplate = async (req: RequestWithIdAdmin, res: Response) => {
    const accountId = req.accountId;
    const userId = req.jwtDecoded.id;
    try {
        let templateToAdd = req.file;
        let fileId: string = randomUUID();
        let status = await remDbConDynamic('files').insert({
            id: fileId,
            file: templateToAdd.buffer,
            fileName: templateToAdd.originalname,
            mime: templateToAdd.mimetype,
            accountId: accountId,
            isTemplate: true,
            createdBy: userId
        });
        res.json(status);
        return fileId;
    } catch (err) {
        res.status(400).end();
        return -1;
    }
}

let getFileErr = async(err: Error, req: Request, res: Response, next) => {
    if(res.headersSent) next();
    else {
        res.status(400).json('Error getting file');
    }
}

export {getFile, getTemplates, uploadTemplate, getFileErr};
