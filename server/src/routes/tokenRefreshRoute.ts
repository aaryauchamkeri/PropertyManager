import { Router } from "express";
import { refresh } from "../controllers/jwtVerify/jwtRefresh.js";

const router: Router = Router();

router.get('/refresh', refresh);

export {router as refreshRouter};