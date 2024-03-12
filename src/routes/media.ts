import { Router } from "express";
import { create, get, delete as delete_ } from './handler/media';

const router = Router();

router.get('/', get);
router.post('/', create)
router.delete('/', delete_)

export default router;
