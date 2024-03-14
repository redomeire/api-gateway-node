import { Router } from "express";
import { create, get, delete as delete_ } from './handler/media';
import { verifyToken } from "../middleware";

const router = Router();

router.get('/', verifyToken, get);
router.post('/', create)
router.delete('/', delete_)

export default router;
