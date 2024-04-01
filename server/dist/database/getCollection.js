import { MongoClient } from 'mongodb';
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';
const client = new MongoClient(uri);
const db = client.db("RealEstateManager");
const getCollection = (name) => {
    const collection = db.collection(name);
    return collection;
};
export default getCollection;
export { db };
export { client };
//# sourceMappingURL=getCollection.js.map