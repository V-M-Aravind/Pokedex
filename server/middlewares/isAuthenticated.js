import jwt from "jsonwebtoken";

const key = "my-secret-key";
export default async function isAuthenticated(req, res, next) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401);
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return res.status(401);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, key);
  } catch (err) {
    return res.status(401);
  }
  if (!decodedToken) {
    return res.status(401);
  }
  req.user = decodedToken;
  next();
}
