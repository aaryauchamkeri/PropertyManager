import { Response } from "express";
import { RequestWithIdAdmin } from "../../middleware/property/verifyAccess.js";
import TenantService from "../../services/TenantService.js";


let addTenant = async (req: RequestWithIdAdmin, res: Response, next) => {
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

let updateTenant = (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let {id, update} = req.body;
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.accountId;
        const tenantService = new TenantService(accountId, jwtDecoded.id);
        tenantService.updateTenant(id, update);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
}

let deleteTenant = (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let jwtDecoded = req.jwtDecoded;
        let tenantId = req.header('tenantId');
        let accountId = req.accountId;
        let tenantService = new TenantService(accountId, jwtDecoded.id);
        tenantService.deleteTenant(tenantId);
        res.status(200).end();
    } catch(err) {
        next(err);
    }
}

let viewAllTenants = async (req: RequestWithIdAdmin, res: Response, next) => {
    try {
        let jwtDecoded = req.jwtDecoded;
        let accountId = req.accountId;
        let tenantService = new TenantService(accountId, jwtDecoded.id);
        res.status(200).json(await tenantService.viewAllTenants());
    } catch(err) {
        next(err);
    }
}

export {addTenant, updateTenant, deleteTenant, viewAllTenants};