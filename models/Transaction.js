const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TransactionSchema = new Schema({
    type: { type : String, required : true} ,
    amount: { type : Number, required : true} ,
    statements: {type : String, required : true},
    date: { type : Date, required : true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
});

module.exports = mongoose.model('Transaction', TransactionSchema)