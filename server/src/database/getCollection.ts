import {Collection, Db, MongoClient} from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';

const client: MongoClient = new MongoClient(uri);
const db: Db = client.db("RealEstateManager");

const getCollection = (name: string): Collection => {
    const collection = db.collection(name);
    return collection;
}

export default getCollection;
export {db};
export {client};