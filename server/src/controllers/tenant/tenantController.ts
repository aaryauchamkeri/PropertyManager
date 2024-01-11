import { Response } from "express";
import { ExtendedRequestAdmin } from "../../middleware/property/verifyAccess.js";
import TenantService from "../../services/TenantService.js";


let addTenant = async (req: ExtendedRequestAdmin, res: Response, next) => {
    try {
        let body = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.header('accountId');
        let tenantInformation = body.info;
        if(tenantInformation && accountId) {
            let tenantService = new TenantService(accountId, jwtDecoded.id);
            let id = await tenantService.addTenant({accountId, ...tenantInformation});
            if(id < 0) res.status(400).end();
            else res.status(200).json({tenantId: id});
        } else {
            res.status(400).json({message: 'Missing required field.'});
        }
    } catch(err) {
        next(err);
    }
}

let updateTenant = (req: ExtendedRequestAdmin, res: Response, next) => {
    try {
        let body = req.body;
        let jwtDecoded = req.jwtDecoded;
        let tenantId = req.header('tenantId');
        let accountId = req.header('accountId');
        let tenantInformation = body.info;
        const tenantService = new TenantService(accountId, jwtDecoded.id);
        tenantService.updateTenant(tenantId, tenantInformation);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
}

let deleteTenant = (req: ExtendedRequestAdmin, res: Response, next) => {
    try {
        let jwtDecoded = req.jwtDecoded;
        let tenantId = req.header('tenantId');
        let accountId = req.header('accountId');
        let tenantService = new TenantService(accountId, jwtDecoded.id);
        tenantService.deleteTenant(tenantId);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
}

export {addTenant, updateTenant, deleteTenant};