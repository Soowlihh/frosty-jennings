/*const Joi = require('joi')

module.exports.transactionSchema = Joi.object({
    transaction:Joi.object().required({
        type: Joi.string().required(),
        amount: Joi.number().required(),
        Description: Joi.string().required(),
        Date: Joi.date().required(),
    })
})*/
const Joi = require("joi");

module.exports.transactionSchema = Joi.object({
  statements: Joi.string().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("Income", "Expense").required(),
  date: Joi.string().required()
});
