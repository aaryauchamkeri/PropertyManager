import { Router } from 'express';
import { login, logout } from '../controllers/login/loginout.js';
const router = Router();
router.post('/login', login);
router.post('/logout', logout);
export { router as authRouter };
//# sourceMappingURL=authRoutes.js.map