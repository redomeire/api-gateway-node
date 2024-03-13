import { Router } from "express";
import { register } from './handler/user';
const router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    status: 200
  });
});

router.post('/register', register)

export default router;
