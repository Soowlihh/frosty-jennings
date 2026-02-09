const express = require('express')
const mongoose = require('mongoose')
const Transaction = require('./models/Transaction')
const catchAsync = require('./utilities/catchAsync')
const expressError = require('./utilities/expressError')
const cors = require('cors')
require("dotenv").config();
const {transactionSchema} = require('./schema.js')
const app = express()
const port = process.env.PORT || 3000

/*mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database Conneceted'))
.catch((error) => console.log('Error', error))*/
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => {
    console.error("Mongo connection error:", error);
    process.exit(1);
  });

const validateTransaction = (req, res, next) => {
    const {error} = transactionSchema.validate(req.body, { abortEarly: false});

    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new expressError(msg, 400)
    }else {
        next();
    }
}
const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  };
  
  app.use(cors(corsOptions));
  
  // ✅ safe preflight handler (works even when "*" crashes)
  app.options(/.*/, cors(corsOptions));
  
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });

app.post('/transactions',validateTransaction, catchAsync(async (req, res)=> {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json(transaction);
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
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body)
    res.json(transaction)
}))

/*app.listen(port, () => {
    console.log('Listening on port 3000')
})*/