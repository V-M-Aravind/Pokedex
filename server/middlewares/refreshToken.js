import jwt from "jsonwebtoken";
import { users } from "../data/index.js";

const key = "my-secret-key";
export default async function refreshToken(req, res, next) {
  try {
    const refToken = req.cookies?.refreshToken;
    console.log(refToken);
    if (!refToken) {
      res.status(403);
      return res.send(
        JSON.stringify({ message: "Session expired. Please login again!" })
      );
    }
    const user = users?.find((user) => user.refreshToken === refToken);
    if (!user) {
      res.status(403);
      return res.send(
        JSON.stringify({ message: "Invalid token. Please login again!" })
      );
    } else {
      const accessToken = jwt.sign(
        { _id: user._id, username: user.username },
        key,
        {
          expiresIn: "1h",
        }
      );
      res.send({ accessToken, _id: user._id, username: user.username });
    }
  } catch (error) {
    console.log(error);
    res.status(403);
    return res.send(
      JSON.stringify({ message: "Invalid token. Please login again!" })
    );
  }
}
