import { Router } from "express";
import { create, get } from './handler/media';

const router = Router();

router.get('/', get);

router.post('/', create)

export default router;
