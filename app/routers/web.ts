import { Router } from 'express';
import * as handlers from "../handlers/web"

const router = Router();


// Index Page
router.get('/', handlers.indexPage)
router.get('/hive-stats/:hive_name', handlers.hiveStats)


export default router