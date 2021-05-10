import SequelizePackage from 'sequelize';

// db models defined

import {
  Currency,
  LoanApplicationState,
  OverrideType,
  PaymentFrequency,
} from '../repo/enums.js';

const { DataTypes } = SequelizePackage;

export const LoanApplicationModel = (sequelize) => sequelize.define('LoanApplication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  state: {
    type: DataTypes.ENUM,
    values: LoanApplicationState.enums.map((i) => i.value),
    defaultValue: LoanApplicationState.pending_identity.value,
    allowNull: false,
  },
  merchant_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requested_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.ENUM,
    values: Currency.enums.map((i) => i.value),
    defaultValue: Currency.usd.value,
  },
  user_input: {
    type: DataTypes.STRING,
    allowNull: true,
    get: () => JSON.parse(this.getDataValue('user_input')),
    set: (dict) => this.setDataValue('user_input', JSON.stringify(dict)),
  },
  user_input_events: {
    type: DataTypes.STRING,
    get: () => this.getDataValue('user_input_events').split(','),
    set: (arr) => this.setDataValue('user_input_events', arr.join(',')),
    defaultValue: '[]',
  },
  final_decision: {
    // decision models are at server/models/decision.js
    // this should really be a foreign key on a new decision table
    type: DataTypes.STRING,
    allowNull: true,
    get: () => JSON.parse(this.getDataValue('final_decision')),
    set: (dict) => this.setDataValue('final_decision', JSON.stringify(dict)),
  },
  decision_events: {
    type: DataTypes.STRING,
    get: () => this.getDataValue('decision_events').split(','),
    set: (arr) => this.setDataValue('decision_events', arr.join(',')),
    defaultValue: '[]',
  },
  selected_terms_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export const MerchantConfigurationModel = (sequelize) => sequelize.define('MerchantConfiguration', {
  merchant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  minimum_loan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  maximum_loan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
});

/*
Repository for manual overrides on identity checks. We add to this data store
when applications are put in a pending state, but upon manual review, the
identity of the customer is verified and manually marked as clear to proceed
with their applications. The store is indexed by (customer_ssn, override_type),
where override_type is an enum corresponding to one of the following:
1. the customer's credit report has an extended victim fraud alert
2. the customer's information matches one or more watchlists, such as OFAC
*/
export const ManualOverrideModel = (sequelize) => sequelize.define('ManualOverride', {
  ssn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  override_type: {
    type: DataTypes.ENUM,
    values: OverrideType.enums.map((i) => i.value),
    defaultValue: OverrideType.watchlist.value,
    allowNull: false,
  },
});

export const ScheduleModel = (sequelize) => sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_frequency: {
    type: DataTypes.ENUM,
    values: PaymentFrequency.enums.map((i) => i.value),
    defaultValue: PaymentFrequency.monthly.value,
    allowNull: false,
  },
  number_of_payments: {
    type: DataTypes.INTEGER,
  },
  currency: {
    type: DataTypes.ENUM,
    values: Currency.enums.map((i) => i.value),
    defaultValue: Currency.usd.value,
  },
  payment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  first_payment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  last_payment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  payments_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  principal_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  interest_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  apr: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  loan_start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  first_payment_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
