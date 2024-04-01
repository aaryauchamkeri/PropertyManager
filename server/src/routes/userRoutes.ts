import { Router } from "express";
import { getUserData, getAllAccountUsers, removeUserFromAccount } from "../controllers/user/userControllers.js";
import authorizeToken from "../middleware/authentication/jwtMiddleware.js";
import { checkAccountAccess } from "../middleware/property/verifyAccess.js";

const router: Router = Router();

router.use(authorizeToken);
router.use(checkAccountAccess);

router.get('/user', getUserData);
router.get('/remove', removeUserFromAccount);
router.get('/all', getAllAccountUsers);

export {router as userRouter};