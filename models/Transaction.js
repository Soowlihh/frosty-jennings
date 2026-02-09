const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TransactionSchema = new Schema({
    type: String,
    amount: Number,
    Description:String,
    Date: Date,
});

module.exports = mongoose.model('Transaction', TransactionSchema)