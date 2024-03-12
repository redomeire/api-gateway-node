import { Router } from "express";
import { create } from './handler/media';

const router = Router();

router.get('/', function(req, res, next) {
  res.json({
    status: 200,
    message: 'media'
  });
});

router.post('/', create)

export default router;
