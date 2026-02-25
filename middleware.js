// middleware.js
const Transaction = require('./models/Transaction');
// For EJS pages (redirects)
module.exports.isLoggedInPage = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  };
  
  // For React/API (returns JSON)
  module.exports.isLoggedInAPI = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    next();
  };
  
  module.exports.isOwner = async(req,res,next) => {
    const transactions = await Transaction.findById(id);
    if(!transactions.owner || !transactions.owner.equals(req.user._id)){
      return res.redirect('/register');
    }
  }