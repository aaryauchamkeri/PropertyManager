var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from "mongodb";
import getCollection from "../../database/getCollection.js";
const propertiesCollection = getCollection('properties');
let updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tkn = req.jwtDecoded;
    const body = req.body;
    const propertyId = body.propertyId;
    if (!propertyId) {
        return res.status(400).json({
            message: 'Must provide property id'
        });
    }
    else {
        const fieldsTbu = Object.keys(req.body);
        const updatedFields = {};
        const query = {};
        fieldsTbu.forEach((val) => {
            if (val !== 'propertyId') {
                updatedFields[val] = body[val];
            }
            else {
                query['_id'] = new ObjectId(body[val]);
            }
        });
        try {
            console.log(updatedFields);
            console.log(yield propertiesCollection.findOne({ _id: new ObjectId(body['propertyId']) }));
            yield propertiesCollection.updateOne(query, { $set: updatedFields });
            res.status(200).end();
        }
        catch (err) {
            res.status(400).end({ 'message': err.message });
        }
    }
});
export { updateProperty };
//# sourceMappingURL=updateProperty.js.map