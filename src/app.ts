import express from "express";

const app = express();

// Middleware
app.use(express.json());

// First Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Restaurant Backend API 🚀",
  });
});

export default app;