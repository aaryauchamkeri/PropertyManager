import { Response } from "express";
import { ExtendedRequestAdmin } from "../../middleware/property/verifyAccess.js";
import PropertyService from "../../services/PropertyServices.js";


let addProperty = async (req: ExtendedRequestAdmin, res: Response, next) => {
    try {
        const body = req.body;
        const accountId = req.header('accountId');
        const jwtDecoded = req.jwtDecoded;
        const propertyServce = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
        const added = await propertyServce.addProperty({...body.propertyData});
        if(added) res.status(200).end();
        else res.status(400).end();
    } catch(err) {
        next(err);
    }
}

let updateProperty = async (req: ExtendedRequestAdmin, res: Response, next) => {
    try{
        const body = req.body;
        const jwtDecoded = req.jwtDecoded;
        const accountId = req.header('accountId');
        const propertyId = body.propertyId;
        const dataTbu = body.update;
        const propertyService = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
        let updated = propertyService.updateProperty(propertyId, dataTbu);
        if(updated) res.status(200).end();
        else res.status(400).end();
    } catch(err) {
        next(err);
    }
}

let deleteProperty = async (req: ExtendedRequestAdmin, res: Response, next) => {
    try {
        if(req.isAdmin) {
            const propertyId = req.body.propertyId;
            const accountId = req.header('accountId');
            const jwtDecoded = req.jwtDecoded;
            const propertyService = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
            let deleted = await propertyService.deleteProperty(propertyId);
            if(deleted) res.status(200).end();
            else res.status(400);
        } else {
            res.status(401).end();
        }
    } catch(err) {
        next(err);
    }
}

let getProperties = async(req: ExtendedRequestAdmin, res: Response, next) => {
    try {
        const accountId = req.header('accountId');
        const userId = req.params.userId;
        const propertyServce = new PropertyService(accountId, userId, false);
        res.status(200).json(await propertyServce.getProperties());
    } catch(err) {
        next(err);
    }
}

export {addProperty, updateProperty, deleteProperty, getProperties};