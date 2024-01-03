import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addProperty, updateProperty } from '../controllers/property/propertyControllers.js';
import { checkAccessToAccount } from '../middleware/property/checkAccess.js';

const router: Router = Router();

router.use(authorizeToken);
router.use(checkAccessToAccount);

router.post('/add', addProperty);
router.post('/update', updateProperty);

export {router as propertyRouter};


