const express = require('express')
const mongoose = require('mongoose')
const Transaction = require('./models/Transaction')
const catchAsync = require('./utilities/catchAsync')
const expressError = require('./utilities/expressError')
const cors = require('cors')
const {transactionSchema} = require('./schema.js')
const app = express()
const port = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')
.then(() => console.log('Database Conneceted'))
.catch(() => console.log('Error'))

const validateTransaction = (req, res, next) => {
    const {error} = transactionSchema.validate(req.body, { abortEarly: false});

    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    }else {
        next();
    }
}
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post('/transactions',validateTransaction, catchAsync(async (req, res)=> {
    const transaction = await Transaction.create(req.body);
    console.log('Home Page')
}))

app.get('/', (req, res) => {
    res.send('Expense Tracker')
})

app.get('/transactions', catchAsync(async(req,res) => {
    const transaction = await Transaction.find({})
    res.json(transaction)
}))

app.get('/transactions/:id', catchAsync(async(req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.json(transaction)
}))

app.delete('/transactions/:id', catchAsync(async(req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id)
    res.json({message : 'Deleted'})
}))

app.put('/transactions/:id' , validateTransaction, catchAsync(async(req, res) => {
    const transaction = await Transaction.findbyIdandUpdate(req.params.id, req.body)
    res.json(transaction)
}))

app.listen(port, () => {
    console.log('Listening on port 3000')
})