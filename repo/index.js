import { LoanApplication, ManualOverride, MerchantConfiguration, Schedule } from '../db/index.js'

// repo accesses db tables

export class LoanApplicationRepo {
  static get_by_id = async (id) => LoanApplication.findByPk(id)

  static create = async (merchant_id, requested_amount, currency) => {
    return LoanApplication.create({ merchant_id, requested_amount, currency })
  }

  static handle_user_input = async (loan_application_id, user_input) => {
    const loan_application = await this.get_by_id(loan_application_id)
    const cur_user_input = loan_application.user_input

    // no user_input saved
    if (!cur_user_input) {
      let events = loan_application.user_input_events
      events.push(user_input)

      return loan_application.update({
        user_input_events: events,
        user_input,
      })
    }

    // user_input can only be set once
    for (const [key, value] of Object.entries(user_input)) {
      if (value !== cur_user_input[key] && cur_user_input[key] && value) {
        throw `Cannot override ${key} on loan application ${loan_application_id}`
      }
    }

    let events = loan_application.user_input_events
    events.push(user_input)

    return loan_application.update({
      user_input_events: events,
      user_input: {...cur_user_input, ...user_input},
    })
  }

  static handle_decision = async (loan_application_id, decision) => {
    const loan_application = await this.get_by_id(loan_application_id)
    let events = loan_application.decision_events
    events.push(decision)

    return loan_application.update({
      decision_events: events,
      final_decision: decision,
    })
  }
}

export class ManualOverrideRepo {
  static get = async (ssn, override_type) => ManualOverride.findOne({ where: { ssn, override_type } })
  static does_customer_have_override = async (ssn, override_type) => !!(await this.get(ssn, override_type))
}

export class MerchantRepo {
  static get_merchant_configuration = async (id) => MerchantConfiguration.findByPk(id)
}

export class TermsRepo {
  static get_schedule = async (id) => Schedule.findByPk(id)
  static save_schedules = async (schedules) => Schedule.bulkCreate(schedules)
}
