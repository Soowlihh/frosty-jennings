const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Transaction = require('../models/Transaction');
const catchAsync = require('../utilities/catchAsync');
const expressError = require('../utilities/expressError');
const {transactionSchema} = require('../schema.js');

const validateTransaction = (req, res, next) => {
    const {error} = transactionSchema.validate(req.body, { abortEarly: false});

    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    }else {
        next();
    }
}

const validateObjectId = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new expressError("Invalid transaction id", 400);
      }
      next();
    };


    router.get("/ping", (req, res) => res.json({ ok: true }));

router.post('/',validateTransaction, catchAsync(async (req, res)=> {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json(transaction);
}))

router.get('/', catchAsync(async(req,res) => {
    const transaction = await Transaction.find({})
    res.json(transaction)
}))

router.get('/:id', validateObjectId, catchAsync(async(req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) throw new expressError("Transaction not found", 404);
    res.json(transaction)
}))

router.delete('/:id', validateObjectId, catchAsync(async(req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    res.json({message : 'Deleted'})
}))

router.put('/:id/edit' , validateObjectId, validateTransaction, catchAsync(async(req, res) => {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.json(transaction)
}))

module.exports = router;