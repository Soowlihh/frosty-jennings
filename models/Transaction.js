const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TransactionSchema = new Schema({
    type: { type : String, required : true} ,
    amount: { type : Number, required : true} ,
    statements: {type : String, required : true},
    date: { type : Date, required : true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      }
      
});

module.exports = mongoose.model('Transaction', TransactionSchema)