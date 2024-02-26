import { Router } from 'express';
import { addEvent, test, viewEvents } from '../controllers/schedule/scheduleControllers.js';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';

const router: Router = Router();

router.use(authorizeToken);
router.use(checkAccountAccess);

router.post('/add', addEvent);
router.get('/view', viewEvents);
router.post('/test', test);

export {router as scheduleRouter};