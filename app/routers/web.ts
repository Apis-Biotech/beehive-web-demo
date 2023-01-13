import { Router } from 'express';
import * as handlers from "../handlers/web"

const router = Router();

router.get('/hive-stats/:hive_name', handlers.hiveStats)


export default router