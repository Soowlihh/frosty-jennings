require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const transactions = require('./routes/transactions');
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/user');
const userRoutes = require('./routes/user');
const { loginLimiter, registerLimiter, transactionLimiter } = require('./rateLimiter');


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database Conneceted'))
.catch((error) => console.log('Error', error))

const corsOptions = {
  origin: process.env.CLIENT_URL ||"http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", " Authorization"],
  };
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
  
app.use(cors(corsOptions));
  
  // ✅ safe preflight handler (works even when "*" crashes)
app.options(/.*/, cors(corsOptions));
app.use(express.json());
  

app.use('/transactions', transactions);
app.use('/', userRoutes);


app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });


app.get('/', (req, res) => {
    res.redirect('/register')
});

/*app.all("*", (req, res, next) => {
  next(new expressError("Route Not Found", 404));
});*/

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  });

  app.listen(port, () => {
    console.log("Listening on port", port);
  });
  

