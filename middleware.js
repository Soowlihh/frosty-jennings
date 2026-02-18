// middleware.js

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
  