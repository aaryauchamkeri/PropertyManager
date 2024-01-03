import { Router } from 'express';
import { login, logout } from '../controllers/login/loginout.js';

const router: Router = Router();


router.post('/login', login);
router.post('/logout', logout);


export {router as authRouter};

