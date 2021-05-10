import Enum from 'enum';

// credit report
export const CreditBureau = new Enum({
  extrafax: 'extrafax',
}, {
  ignoreCase: true, freeze: true,
});

export const CreditReportPullStatus = new Enum({
  hit: 'hit', no_hit: 'no_hit',
}, {
  ignoreCase: true, freeze: true,
});

// currency
export const Currency = new Enum({
  usd: 'usd', cad: 'cad', eur: 'eur', gbp: 'gbp',
}, {
  ignoreCase: true, freeze: true,
});

// decisions
export const PendingState = new Enum({
  needs_ssn: 'needs_ssn',
  needs_income: 'needs_income',
  watchlist_hit: 'watchlist_hit',
  extended_fraud_victim: 'extended_fraud_victim',
}, {
  ignoreCase: true, freeze: true,
});

export const DeniedReason = new Enum({
  geography: 'geography',
  too_young: 'too_young',
  identity_not_found: 'identity_not_found',
  credit_report_frozen: 'credit_report_frozen',
  identity_mismatch: 'identity_mismatch',
  insufficient_credit: 'insufficient_credit',
  amount_over_max: 'amount_over_max',
  amount_under_min: 'amount_under_min',
}, {
  ignoreCase: true, freeze: true,
});

// income_frequency
export const IncomeFrequency = new Enum({
  biweekly: 'biweekly', monthly: 'monthly', anually: 'anually',
}, {
  ignoreCase: true, freeze: true,
});

// overrides
export const OverrideType = new Enum({
  extended_fraud_victim: 'extended_fraud_victim', watchlist: 'watchlist',
}, { ignoreCase: true, freeze: true });

// payment_frequency
export const PaymentFrequency = new Enum({ monthly: 'monthly' }, { ignoreCase: true, freeze: true });

// watchlist
export const Watchlist = new Enum({ ofac: 'ofac', osfi: 'osfi' }, { ignoreCase: true, freeze: true });

// signals
export const SignalKey = new Enum({
  address_country_code: 'address_country_code',
  address_postal_code: 'address_postal_code',
  address_region1_code: 'address_region1_code',
  address_street1: 'address_street1',
  address_street2: 'address_street2',
  user_age: 'user_age',
  user_email: 'user_email',
  user_first_name: 'user_first_name',
  user_last_name: 'user_last_name',
  merchant_minimum_loan_amount: 'merchant_minimum_loan_amount',
  merchant_maximum_loan_amount: 'merchant_maximum_loan_amount',
  ask_income_above_threshold: 'ask_income_above_threshold',
  ask_income_disabled: 'ask_income_disabled',
  ask_ssn_disabled: 'ask_ssn_disabled',
  minimum_age: 'minimum_age',
  requested_loan_amount: 'requested_loan_amount',
}, { ignoreCase: true, freeze: true });

// loan_application
export const LoanApplicationState = new Enum({
  pending_identity: 'pending_identity',
  pending_underwriting: 'pending_underwriting',
  denied: 'denied',
  approved: 'approved',
  confirmed: 'confirmed',
}, { ignoreCase: true, freeze: true });
