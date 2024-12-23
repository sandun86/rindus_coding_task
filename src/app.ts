import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);

// Health check route
app.get("/", (req, res) => {
    res.send("API is running!");
});

// Error handler
app.use(errorHandler);

export default app;
