const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    handler: (req,res) => {
        res.status(429).json({
            ok:false,
            message:"Too many login attempts try again later"
        });
    }
});


const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    handler: (req,res) => {
        res.status(429).json({
            ok:false,
            message:"Too many login attempts try again later"
        });
    }
});


const transactionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    handler: (req,res) => {
        res.status(429).json({
            ok:false,
            message:"Too many login attempts try again later"
        });
    }
});

module.exports = { loginLimiter, registerLimiter, transactionLimiter}