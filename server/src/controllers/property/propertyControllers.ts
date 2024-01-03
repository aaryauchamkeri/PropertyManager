import { Response } from "express";
import { ExtendedRequest } from "../../middleware/authentication/jwtMiddleware.js";
import { Collection, ObjectId } from "mongodb";
import getCollection from "../../database/getCollection.js";


const propertiesCollection: Collection = getCollection('properties');

let addProperty = async (req: ExtendedRequest, res: Response) => {
    res.json('hello world');
}


let updateProperty = async (req: ExtendedRequest, res: Response) => {
    const body = req.body;
    const propertyId = body.propertyId;
    if(!propertyId) {
        return res.status(400).json(
            {
                message: 'Must provide property id'
            }
        );
    } else {
        const fieldsTbu: string[] = Object.keys(req.body);
        const updatedFields = {}
        const query = {}

        fieldsTbu.forEach((val: string) => {
            if(val !== 'propertyId') {
                updatedFields[val] = body[val];
            } else {
                query['_id'] = new ObjectId(body[val]);
            }
        });
        try {
            console.log(updatedFields);
            console.log(await propertiesCollection.findOne({_id: new ObjectId(body['propertyId'])}));
            await propertiesCollection.updateOne(query, {$set: updatedFields})
            res.status(200).end();
        } catch(err) {
            res.status(400).end({'message': err.message});
        }
    }
}

export {addProperty, updateProperty};