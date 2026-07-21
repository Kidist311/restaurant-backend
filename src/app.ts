import express from "express";
//import menuRoutes from "./routes/menu.routes.js";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();

// Middleware
app.use(express.json());


// custom middleware
app.use(logger);

// First Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Restaurant Backend API 🚀",
  });
})

// MENU ROUTES
//app.use("/api/menu", menuRoutes);


export default app;