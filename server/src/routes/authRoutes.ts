import { Router } from 'express';
import { login } from '../controllers/login/loginout.js';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';

const router: Router = Router();


router.post('/login', login);



export {router as authRouter};

