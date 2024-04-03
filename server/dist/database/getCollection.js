import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://aaryachamkeri06:3billionmrr@portfoliopms.9ix6mey.mongodb.net/?retryWrites=true&w=majority&appName=PortfolioPMS';
const client = new MongoClient(uri);
const db = client.db("portfoliopms");
export { db };
export { client };
//# sourceMappingURL=getCollection.js.map