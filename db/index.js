import { Sequelize } from 'sequelize';
import { sequelizeLogger } from './utils.js';
import {
  LoanApplicationModel,
  MerchantConfigurationModel,
  ManualOverrideModel,
  ScheduleModel,
} from './models.js';
import { OverrideType } from '../repo/enums.js';

// This will create an in-memory sqlite db
const sequelize = new Sequelize('sqlite::memory:', {
  logging: sequelizeLogger,
});

// Test that db is working
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
  } catch (error) {
    console.log(`Facing an issue with Sequelize \n ${JSON.stringify({ error }, undefined, 2)}`);
  }
})();

// tables
export const MerchantConfiguration = MerchantConfigurationModel(sequelize);
export const LoanApplication = LoanApplicationModel(sequelize);
export const ManualOverride = ManualOverrideModel(sequelize);
export const Schedule = ScheduleModel(sequelize);

(async () => {
  try {
    await sequelize
      .sync({ force: true })
      .then(() => {
        // seed db
        MerchantConfiguration.create({
          name: "Zelda's Stationary",
          minimum_loan_amount: 100.00,
          maximum_loan_amount: 3000.00,
        });
        ManualOverride.create({
          ssn: '987-65-4321',
          override_type: OverrideType.watchlist.value,
        });
      });
    sequelizeLogger('Database Built');
  } catch (error) {
    sequelizeLogger('Database failed to build', error);
  }
})();
