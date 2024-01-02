import express from 'express';
import cors from 'cors';
// import {MongoClient} from 'mongodb';
import { authRouter } from './routes/authRoutes.js';
import { infoRouter } from './routes/propertyInfoRoutes.js';
import { refreshRouter } from './routes/tokenRefreshRoute.js';
import { propertyRouter } from './routes/propertyRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    console.log(req.headers.authorization);
    res.end('hello');
});

app.use('/token', refreshRouter);
app.use('/info', infoRouter);
app.use('/auth', authRouter);
app.use('/properties', propertyRouter);

app.listen(3000, '0.0.0.0', () => {

});