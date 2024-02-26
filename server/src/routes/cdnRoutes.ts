import { Router } from 'express';
import { login, logout } from '../controllers/login/loginout.js';
import { getFile } from '../controllers/cdn/cdn.js';

const router: Router = Router();


router.get('/:name', getFile);
// router.post('/logout', logout);


export {router as cdnRouter};

