import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import schema from "./graphql/schema.js";
import login from "./middlewares/login.js";
import signup from "./middlewares/signup.js";
import refreshToken from "./middlewares/refreshToken.js";
const app = express();
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend2.example.com",
  "http://localhost:8080",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        console.log(origin);
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true, // This is important if you are using cookies
  })
);
app.use(cookieParser());

// Status endpoint for health checks
app.get("/status", (req, res) => res.send({ status: "up", version: "1.0.0" }));
app.post("/login", login);
app.post("/signup", signup);
app.post("/refresh-token", refreshToken);
app.all("/api", createHandler({ schema }));
app.get("/playground", expressPlayground.default({ endpoint: "/api" }));

// Listen on port 8080
const PORT = process.env.PORT || 8080; // Use environment variable or fallback to 8080
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
