import { Router } from 'express';
import { addEvent, viewEvents } from '../controllers/schedule/scheduleControllers.js';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
const router = Router();
router.use(authorizeToken);
router.use(checkAccountAccess);
router.post('/add', addEvent);
router.get('/view', viewEvents);
export { router as scheduleRouter };
//# sourceMappingURL=scheduleRoutes.js.map