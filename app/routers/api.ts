import { Router } from 'express';
import * as handlers from "../handlers/api"

const router = Router();


// Index Page
router.post('/api/submit-data', handlers.submitData)


export default router