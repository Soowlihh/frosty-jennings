const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');
const { loginLimiter, registerLimiter } = require('../rateLimiter');
const jwt = require('jsonwebtoken');



router.post('/register', registerLimiter, catchAsync(async(req,res,next) => {
    const{ email, username, password } = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({ok: false, message: "Email already in use"});

    const user = new User ( {email , username });
    await User.register(user, password);
    res.status(201).json({ok: true, message: "Registered Succesfully"});
}));


/*router.post('/login', loginLimiter, passport.authenticate('local' , {failureRedirect: '/login'}), (req,res) => {
    const redirectUrl = req.session.returnTo || '/transactions';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});*/

router.post('/login', loginLimiter, catchAsync(async(req,res)=> {
    const {username, password } = req.body;
    const user = await User.findByUsername(username);
    if(!user) return res.status(401).json({ ok: false, message: "Invalid credentials"});

    const isValid = await user.authenticate(password);
    if(!isValid) return res.status(401).json({ok: false, message: "Invalid credentials" });

    const accessToken = jwt.sign(
        {userId : user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        {userId: user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );

    res.cookie('refreshToken' , refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ok:true, accessToken});
})); 

router.post('/refresh', (req,res) => {
    const refreshToken = req.cookies['refreshToken'];

    if(!refreshToken) {
        return res.status(401).json({ok: false, message: " No refrsh token"});
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = jwt.sign(
            {userId: decoded.userId},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m'}
        );
        res.json({ok:true , accessToken});
    } catch(err) {
        return res.status(403).json({ok:false, message: "Invalid or expired token"})
    }
});

router.post('/logout', (req,res,next) => {
    res.clearCookie('refreshToken');
    res.json({ok: true, message: "Logged out"});
});

module.exports = router;
