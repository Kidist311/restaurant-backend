import express from "express";
import helmet from "helmet";
import cors from "cors";
//import menuRoutes from "./routes/menu.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import authRouter from "./modules/auth/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import foodRoutes from "./modules/food/food.route.js";
import categoryRoutes from "./modules/category/category.route.js";
import orderRoutes from "./modules/order/order.route.js";
import reservationRoutes from "./modules/reservation/reservation.route.js";
import reviewRoutes from "./modules/review/review.route.js";
import blogRoutes from "./modules/blog/blog.route.js";
import { setupSwagger } from "./docs/swagger.js";

const app = express();

setupSwagger(app);

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);


// Middleware
app.use(express.json());


// custom middleware
app.use(logger);


// Auth Routes
app.use("/api/v1/auth", authRouter);



// First Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Restaurant Backend API 🚀",
  });
})

app.use(
  "/api/v1/foods",
  foodRoutes
); 

app.use(
  "/api/v1/categories",
  categoryRoutes
);

app.use(

  "/api/v1/orders",
  orderRoutes

);

app.use(
  "/api/v1/reservations",
  reservationRoutes
);


app.use(
  "/api/v1/reviews",
  reviewRoutes
);

app.use(
  "/api/v1/blogs",
  blogRoutes
);

// MENU ROUTES
//app.use("/api/menu", menuRoutes);
app.use(errorMiddleware);


export default app;