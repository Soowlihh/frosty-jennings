const Joi = require('joi')

module.exports.transactionSchema = Joi.object({
    transaction:Joi.object().required({
        type: Joi.string().required(),
        amount: Joi.number().required(),
        Description: Joi.string().required(),
        Date: Joi.date().required(),
    })
})
