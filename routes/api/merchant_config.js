// MERCHANT CONFIG ROUTES
import { MerchantConfiguration } from '../../db/index.js';
import express from 'express';
import chalk from 'chalk';
import { MerchantRepo } from '../../repo/index.js';
const router = express.Router();

// GET api/merchant_config
router.get('/', (req,res,next) => {
    res.send('Init Merchant Config');
});

// POST api/merchant_config - create a new merchant configuration setting in MerchantConfig model
router.post('/', async (req,res, next) => {
    const { data } = req.body; 
    const {merchant_id, name, minimum_loan_amount, maximum_loan_amount, prequal_enabled} = data;

    // if the merchant Id isn't sent with the request
    if (!merchant_id) {
        res.status(400).send('Missing the required merchant Id');
    }
    else {
        // merchant Id was sent along with the request
        try {
            // check to see if merchant Id already exists in the MerchantConfig model
            const merchant = await MerchantRepo.get_merchant_configuration(merchant_id);
            if (merchant) {
                res.status(400).send('Merchant Id already exists in database.')
            }
            else {
                // merchant Id isn't in db yet so try to add the merchant configs model
                try {
                    const result = await MerchantConfiguration.create({
                        merchant_id,
                        name,
                        minimum_loan_amount,
                        maximum_loan_amount,
                        prequal_enabled
                    });
                    // if merchant configs successfully added to database
                    res.status(200).send(result);
                } catch (error) {
                    // attempt to add the merchant configs to database failed
                    res.status(400).send('Request failed.  Merchant configs were unable to be added to database')
                }
            }
        } catch(error) {
            // if run into errors with the call, MerchantRepo.get_merchant_configuration(merchant_id)
            res.status(500).send('Unable to connect to database currently')
        }
    }
});

export default router;