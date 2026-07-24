import express from "express";
//import menuRoutes from "./routes/menu.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import authRouter from "./modules/auth/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// Middleware
app.use(express.json());


// custom middleware
app.use(logger);


// Auth Routes
app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);

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