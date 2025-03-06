import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./graphql/schema.js";
const app = express();
app.use(express.json());

// Status endpoint for health checks
app.get("/status", (req, res) => res.send({ status: "up", version: "1.0.0" }));
app.all("/api", createHandler({ schema }));
app.get("/playground", expressPlayground.default({ endpoint: "/api" }));

// Listen on port 8080
const PORT = process.env.PORT || 8080; // Use environment variable or fallback to 8080
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
