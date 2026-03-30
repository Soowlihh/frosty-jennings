const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Transaction = require('../models/Transaction');
const catchAsync = require('../utilities/catchAsync');
const expressError = require('../utilities/expressError');
const {transactionSchema} = require('../schema.js');
const {isLoggedInAPI,isOwner} = require("../authMiddleware");
const { transactionLimiter} = require('../rateLimiter');



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

const buildQuery = ( userId, query) => {
    const filter = { owner: userId};
    const { type, startDate, endDate, minAmount, maxAmount, sort} = query;

    if(type) filter.type = type;

    if(startDate || endDate) {
        filter.date = {};
        if(startDate) filter.date.$gte = new Date(startDate);
        if(endDate) filter.date.$lte = new Date(endDate);
    }

    if(minAmount || maxAmount){
        filter.amount = {} 
        if(minAmount) filter.amount.$gte = Number(minAmount);
        if(maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    const sortOption = sort === 'oldest' ? { date: 1 }
                     : sort === 'amount' ? { amount: -1 }
                     : {date: -1 };
    
    return { filter, sortOption};
};


router.get("/ping", (req, res) => res.json({ ok: true }));
router.use(transactionLimiter);

router.post('/', isLoggedInAPI, validateTransaction, catchAsync(async (req, res)=> {
    const data = req.body.transaction ?? req.body; 
    const transaction = await Transaction.create({...data, owner: req.user._id});
    return res.status(201).json(transaction);
}))

router.get('/', isLoggedInAPI, catchAsync(async(req,res) => {
    const { filter, sortOption } = buildQuery(req.user._id, req.query);
    const transaction = await Transaction.find(filter).sort(sortOption);
    res.json(transaction)
}))

router.get('/:id', isLoggedInAPI, validateObjectId,isOwner, catchAsync(async(req, res) => {
    const transaction = await Transaction.findOne({_id : req.params.id , owner: req.user._id});
    if (!transaction) throw new expressError("Transaction not found", 404);
    res.json(transaction)
}))

router.delete('/:id', isLoggedInAPI, validateObjectId,isOwner, catchAsync(async(req, res) => {
    const transaction = await Transaction.findOneAndDelete({_id : req.params.id, owner: req.user._id});
    if(!transaction) throw new expressError("Transaction not found", 404);
    res.json({message : 'Deleted'})

}))

router.put('/:id/edit' , isLoggedInAPI, validateObjectId, isOwner,validateTransaction, catchAsync(async(req, res) => {
    const data = req.body.transaction ?? req.body;
    const transaction = await Transaction.findOneAndUpdate({_id: req.params.id, owner: req.user._id}, {$set: data} , {new: true, runValidators: true });
    if(!transaction) throw new expressError("Transaction not found", 404);
    res.json(transaction)
}))

module.exports = router;