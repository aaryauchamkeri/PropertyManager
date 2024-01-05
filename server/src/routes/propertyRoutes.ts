import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { addProperty, deleteProperty, updateProperty } from '../controllers/property/propertyControllers.js';
import { checkAccountAccess } from '../middleware/property/verifyAccess.js';

const router: Router = Router();

router.use(authorizeToken);
router.use('/', checkAccountAccess);

router.post('/add', addProperty);
router.post('/update', updateProperty);
router.post('/delete', deleteProperty);

export {router as propertyRouter};


