import { Router } from 'express';
import * as handlers from "../handlers/api"

const router = Router();


router.post('/api/submit-data', handlers.submitData)
router.get('/api/get-hive-data/:name', handlers.getData)


export default router