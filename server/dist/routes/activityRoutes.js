// This route requires the account id as well as the jwt token
import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';
import { getActivityByProperty, getActivityByTenant, getAllActivity } from '../controllers/activity/activityControllers.js';
const router = Router();
// jwt token
router.use(authorizeToken);
// account id
router.use(checkAccountAccess);
router.get('/all', getAllActivity);
router.get('/tenant', getActivityByTenant);
router.get('/property', getActivityByProperty);
export { router as activityRouter };
//# sourceMappingURL=activityRoutes.js.map