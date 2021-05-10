// MERCHANT CONFIG ROUTES
import { MerchantConfiguration } from '../../db/index.js';
import express from 'express';
import chalk from 'chalk';

const router = express.Router();

// GET api/merchant_config
router.get('/', (req,res,next) => {
    res.send('Init Merchant Config');
});

export default router;