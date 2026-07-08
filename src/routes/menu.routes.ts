import { Router } from "express";
import { getMenu, addFood } from "../controllers/menu.controller.js";


const router = Router();

// GET all menu items
router.get("/", getMenu);

//router.get("/foods/:id", getFoodById);

// New route
router.post("/", addFood);


export default router;