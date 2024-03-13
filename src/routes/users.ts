import { Router } from "express";
import { login, register } from './handler/user';
const router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    status: 200
  });
});

router.post('/register', register)
router.post('/login', login)

export default router;
