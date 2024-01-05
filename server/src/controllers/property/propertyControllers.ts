import { Response } from "express";
import { ExtendedRequest } from "../../middleware/authentication/jwtMiddleware.js";
import { Collection, ObjectId } from "mongodb";
import getCollection from "../../database/getCollection.js";
import { remDbCon, remDbConDynamic } from "../../database/connection.js";
import checkSQLErrorCodes from "../../utilities/checkSQLErrors.js";
import { ExtendedRequestAdmin } from "../../middleware/property/verifyAccess.js";
import PropertyService from "../../services/PropertyServices.js";

const requiredPropertyFields = ['name', 'address', 'purchase_price'];
const propertiesCollection: Collection = getCollection('properties');

let addProperty = async (req: ExtendedRequestAdmin, res: Response) => {
    const body = req.body;
    const accountId = req.header('accountId');
    const jwtDecoded = req.jwtDecoded;
    const propertyServce = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
    const added = await propertyServce.addProperty({...body.propertyData});
    if(added) res.status(200).end();
    else res.status(400).end();
}

let updateProperty = async (req: ExtendedRequestAdmin, res: Response) => {
    const body = req.body;
    const jwtDecoded = req.jwtDecoded;
    const accountId = req.header('accountId');
    const propertyId = body.propertyId;
    const dataTbu = body.update;
    const propertyService = new PropertyService(accountId, jwtDecoded.id, req.isAdmin);
    let updated = propertyService.updateProperty(propertyId, dataTbu);
    if(updated) res.status(200).end();
    else res.status(400).end();
}

let deleteProperty = async (req: ExtendedRequestAdmin, res: Response) => {
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
}

export {addProperty, updateProperty, deleteProperty};