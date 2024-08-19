var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { remDbConDynamic } from "../../database/connection.js";
import { randomUUID } from "crypto";
let getFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.name;
    let fileNameIndexed = fileName.split('.');
    try {
        let files = yield remDbConDynamic('files').select('file', 'mime').where({
            id: fileNameIndexed[0]
        });
        let firstResponse = files[0];
        const mimeType = firstResponse.mime;
        let file = firstResponse.file;
        res.setHeader('Content-Type', mimeType);
        res.send(file).end();
    }
    catch (err) {
        next(err);
    }
});
let getTemplates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.accountId;
    try {
        let files = yield remDbConDynamic('files').select("*")
            .where({
            accountId: accountId,
            isTemplate: true
        });
        res.json(files);
    }
    catch (err) {
        res.status(400).end();
    }
});
let uploadTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.accountId;
    const userId = req.jwtDecoded.id;
    try {
        let templateToAdd = req.file;
        let fileId = randomUUID();
        let status = yield remDbConDynamic('files').insert({
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
    }
    catch (err) {
        res.status(400).end();
        return -1;
    }
});
let getFileErr = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.headersSent)
        next();
    else {
        res.status(400).json('Error getting file');
    }
});
export { getFile, getTemplates, uploadTemplate, getFileErr };
//# sourceMappingURL=cdn.js.map