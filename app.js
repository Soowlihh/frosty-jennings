const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const transactions = require('./routes/transactions');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const User = require('./models/user');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database Conneceted'))
.catch((error) => console.log('Error', error))

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  };
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
  
app.use(cors(corsOptions));
  
  // ✅ safe preflight handler (works even when "*" crashes)
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true only in HTTPS production
    }
  }));
  

<<<<<<< HEAD
app.use('/transactions', transactions);
=======
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/transactions', transactions);
app.use('/', userRoutes);
>>>>>>> 62ce17c (Added Authentication)


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
  

