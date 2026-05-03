const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
<<<<<<< HEAD
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.startsWith("Bearer ")
    ? header.split(" ")[1]
    : header;

=======
>>>>>>> 7842b7840910e24c8b1581f3ab803d9712c0fd1d
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};