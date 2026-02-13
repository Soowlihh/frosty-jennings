const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');
const expressError = require('./utilities/expressError');
const transactions = require('./routes/transactions');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database Conneceted'))
.catch((error) => console.log('Error', error))
/*mongoose
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
  });*/

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  };

  
app.use(cors(corsOptions));
  
  // ✅ safe preflight handler (works even when "*" crashes)
app.options(/.*/, cors(corsOptions));
  
app.use(express.json());

app.use('/transaction', transactions);


app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });


app.get('/', (req, res) => {
    res.send('Expense Tracker')
});

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
      message: err.message || "Internal Server Error",
    });
  });

  app.listen(port, () => {
    console.log("Listening on port", port);
  });
  

