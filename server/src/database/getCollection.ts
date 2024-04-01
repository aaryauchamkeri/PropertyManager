import {Collection, Db, MongoClient} from 'mongodb';

const uri = 'mongodb+srv://aaryachamkeri06:3billionmrr@portfoliopms.9ix6mey.mongodb.net/?retryWrites=true&w=majority&appName=PortfolioPMS';

const client: MongoClient = new MongoClient(uri);
const db: Db = client.db("portfoliopms");


export {db};
export {client};