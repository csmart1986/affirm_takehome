import express from 'express';

import {
  LoanApplicationRepo, ManualOverrideRepo, MerchantRepo, TermsRepo,
} from '../../repo/index.js';
import { Currency } from '../../repo/enums.js';

const router = express.Router();

/* GET Loan Application */
router.get('/', (req, res, next) => {
  res.send('Init Loan Application');
});

/* POST Init Loan Application */
router.post('/', async (req, res, next) => {
  const { data } = req.body;
  const requested_amount = data.requested_amount_cents / 100.0;
  const currency = Currency.get(data.currency);

  if (currency !== Currency.usd) {
    res.status(400).send({
      field: 'currency',
      message: 'Only USD is supported presently.',
    });
  }

  const merchant_conf = await MerchantRepo.get_merchant_configuration(data.merchant_id);
  if (!merchant_conf) {
    res.status(400).send({
      field: 'merchant_id',
      message: 'Could not find that merchant.',
    });
  }

  const loan_app = await LoanApplicationRepo.create(data.merchant_id, requested_amount, currency);

  res.status(200).send({
    loan_application_id: loan_app.id,
    next_step: 'identity',
    submit_url: `POST /api/loan_application/${loan_app.id}/identity`,
  });
});

export default router;
