import { Router } from 'express';
import * as handlers from "../handlers/api"

const router = Router();


router.post('/api/submit-data', handlers.submitData)
router.post('/api/heartbeat', handlers.submitHeartbeat)
router.get('/api/latest-heartbeat/:name', handlers.getLastHeartbeat)
router.get('/api/get-hive-data/:name', handlers.getData)


export default router