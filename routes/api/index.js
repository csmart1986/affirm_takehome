import express from 'express';

const router = express.Router();

/* GET api. */
router.get('/', (req, res, next) => {
  res.send('API!');
});

export default router;
