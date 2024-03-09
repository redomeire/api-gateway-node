import { Router } from "express"
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: 200,
    data: 'success'
  });
});

export default router;
