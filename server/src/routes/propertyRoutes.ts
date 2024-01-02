import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
import { updateProperty } from '../controllers/property/propertyControllers.js';

const router: Router = Router();

// router.use(authorizeToken);

router.post('/update', updateProperty);

export {router as propertyRouter};


