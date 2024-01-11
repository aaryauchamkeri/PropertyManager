import express from 'express';
import cors from 'cors';
// import {MongoClient} from 'mongodb';
import { authRouter } from './routes/authRoutes.js';
import { infoRouter } from './routes/propertyInfoRoutes.js';
import { refreshRouter } from './routes/tokenRefreshRoute.js';
import { propertyRouter } from './routes/propertyRoutes.js';
import { tenantRouter } from './routes/tenantRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    console.log(req.headers.authorization);
    res.end('hello');
});

app.use('/token', refreshRouter);
app.use('/info', infoRouter);
app.use('/auth', authRouter);
app.use('/properties', propertyRouter);
app.use('/tenants', tenantRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log('app listening on port 3000');
});