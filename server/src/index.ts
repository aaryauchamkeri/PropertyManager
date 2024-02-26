import express from 'express';
import cors from 'cors';
// import {MongoClient} from 'mongodb';
import { authRouter } from './routes/authRoutes.js';
import { infoRouter } from './routes/test.js';
import { refreshRouter } from './routes/tokenRefreshRoute.js';
import { propertyRouter } from './routes/propertyRoutes.js';
import { tenantRouter } from './routes/tenantRoutes.js';
import { scheduleRouter } from './routes/scheduleRoutes.js';
import { cdnRouter } from './routes/cdnRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/token', refreshRouter);
app.use('/info', infoRouter);
app.use('/auth', authRouter);
app.use('/properties', propertyRouter);
app.use('/tenants', tenantRouter);
app.use('/schedule', scheduleRouter);
app.use('/media', cdnRouter);

app.listen(3000, '0.0.0.0', () => {});