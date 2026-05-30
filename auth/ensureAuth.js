const jwt = require('jsonwebtoken');

function ensureAuth(req, res, next) {
  // 1. Check Authorization header (Swagger / API clients)
  const authHeader = req.headers.authorization;

  // 2. Check JWT cookie (Google OAuth login)
  const cookieToken = req.cookies?.jwt;

  // Determine which token to use
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : cookieToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
}

module.exports = ensureAuth;
