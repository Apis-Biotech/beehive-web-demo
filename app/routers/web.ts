import { Router } from 'express';
import * as handlers from "../handlers/web"

const router = Router();


// Index Page
router.get('/', handlers.indexPage)


export default router