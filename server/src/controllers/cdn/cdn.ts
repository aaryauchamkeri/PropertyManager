import { Request, Response } from "express";
import { remDbConDynamic } from "../../database/connection.js";


// function getMime(extension: string): string {
//     switch(extension) {
//         case 'html': return 'text/html';
//         case 'css': return 'text/css';
//         case 'jpeg' || 'jpg': return 'image/jpeg';
//         case 'png': return 'image/png';
//         case 'txt': return 'text/plain';
//         default: throw new Error('Invalid mime type');
//     }
// }

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

let getFileErr = async(err: Error, req: Request, res: Response, next) => {
    if(res.headersSent) next();
    else {
        res.status(400).json('Error getting file');
    }
}

export {getFile, getFileErr};
