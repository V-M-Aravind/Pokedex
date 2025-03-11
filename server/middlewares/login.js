import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../data/index.js";

const key = "my-secret-key";
export default async function login(req, res) {
  console.log(req.body);
  const { username = "", password = "" } = req.body;
  if (!username || !password) {
    res.status(401);
    return res.send(
      JSON.stringify({ message: "username or password is incorrect" })
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = users.find((u) => u.username === username);
    if (!user) {
      res.status(401);
      return res.send(
        JSON.stringify({ message: "username or password is incorrect" })
      );
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      res.status(401);
      return res.send(
        JSON.stringify({ message: "username or password is incorrect" })
      );
    } else {
      const accessToken = jwt.sign(
        { _id: user._id, username: user.username },
        key,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign(
        { _id: user._id, username: user.username },
        key,
        {
          expiresIn: "2d",
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 48 * 60 * 60 * 1000,
      });
      return res.send(JSON.stringify({ username, _id: user._id, accessToken }));
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.send(JSON.stringify({ message: "server error" }));
  }
}
