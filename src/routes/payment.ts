import { Router } from "express";
var router = Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    status: 200
  });
});

export default router;
