// import functions and db we're testing
import { MerchantRepo } from '../repo/index.js';
import { MerchantConfiguration, LoanApplication, ManualOverride, Schedule } from '../../db/index.js';

import app from '../app.js';

// import assertion library
import request from 'supertest';

describe('Merchant Config routes', () => {
       
// describe('POST /', () => {
//     it('should return newly created post, async function() {
//         await request(app)
//             .post('/api/merchant_config')
//             .send({
//                 merchant_id: 40,
//                 name: 'target',
//                 minimum_loan_amount: 5000,
//                 maximum_loan_amount: 50000,
//                 prequal_enabled: true
//                 })
//             .expect(200)
//     })
// })
})