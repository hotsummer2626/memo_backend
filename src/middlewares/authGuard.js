const { validateToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const contentArr = authHeader.split(" ");
  if (contentArr.length !== 2 || contentArr[0] !== "Bearer") {
    throw new Error("Invalid header format");
  }
  const decoded = validateToken(contentArr[1]);
  if (!decoded) {
    return res.sendStatus(401);
  }
  req.user = decoded;
  next();
};
