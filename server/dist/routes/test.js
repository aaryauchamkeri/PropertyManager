import { Router } from 'express';
import authorizeToken from '../middleware/authentication/jwtMiddleware.js';
const router = Router();
router.use(authorizeToken);
router.get('/', (req, res) => {
    res.end('hlelo world');
});
export { router as infoRouter };
//# sourceMappingURL=test.js.map