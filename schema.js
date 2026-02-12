const Joi = require("joi");

module.exports.transactionSchema = Joi.object({
  statements: Joi.string().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("Income", "Expense").required(),
  date: Joi.date().iso().required()
});
