// middleware.js
const Transaction = require('./models/Transaction');
const jwt = require('jsonwebtoken');
// For EJS pages (redirects)
module.exports.isLoggedInPage = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  };
  
  // For React/API (returns JSON)
  /*module.exports.isLoggedInAPI = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    next();
  };*/

  module.exports.isLoggedInAPI = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader || ! authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ok:false, message: "Unauthorized"});
    }

    const token = authHeader.split(' ')[1];

    try{
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = { _id: decoded.userId};
      next(); 
    } catch(e) {
      return res.status(401).json({ok: false, message: " Invalid or expired token"});
    }
  };
  
  module.exports.isOwner = async(req,res,next) => {
    try{
    const transactions = await Transaction.findById(req.params.id);
    if(!transactions) return res.status(404).json({ok: false, message: "Not Found"});
      if(!transactions.owner.equals(req.user._id)){
      return res.status(403).json({ok: false, message: "forbidden"})
    }
    next();
  } catch(e) {
    next(e);
  } 
}