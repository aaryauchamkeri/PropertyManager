import {Collection, Db, MongoClient} from 'mongodb';

const uri = '--------';

const client: MongoClient = new MongoClient(uri);
const db: Db = client.db("portfoliopms");


export {db};
export {client};
