const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Transaction = require('../models/Transaction');
const catchAsync = require('../utilities/catchAsync');
const expressError = require('../utilities/expressError');
const {transactionSchema} = require('../schema.js');
const {isLoggedInAPI} = require("../middleware");


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

router.post('/', isLoggedInAPI, validateTransaction, catchAsync(async (req, res)=> {
    const data = req.body.transaction ?? req.body; 
    const transaction = await Transaction.create({...data, user: req.user._id});
    return res.status(201).json(transaction);
}))

router.get('/', isLoggedInAPI, catchAsync(async(req,res) => {
    const transaction = await Transaction.find({user: req.user._id})
    res.json(transaction)
}))

router.get('/:id', isLoggedInAPI, validateObjectId, catchAsync(async(req, res) => {
    const transaction = await Transaction.findOne({_id : req.params.id , user: req.user._id});
    if (!transaction) throw new expressError("Transaction not found", 404);
    res.json(transaction)
}))

router.delete('/:id', isLoggedInAPI, validateObjectId, catchAsync(async(req, res) => {
    const data = req.body.transaction ?? req.body;
    const transaction = await Transaction.findOneAndDelete({_id : req.params.id, data, user: req.user._id});
    res.json({message : 'Deleted'})
}))

router.put('/:id/edit' , isLoggedInAPI, validateObjectId, validateTransaction, catchAsync(async(req, res) => {
    const data = req.body.transaction ?? req.body;
    const transaction = await Transaction.findOneAndUpdate({_id: req.params.id, user: req.user._id, new: true, runValidators: true })
    res.json(transaction)
}))

module.exports = router;