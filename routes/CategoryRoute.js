import express from "express";
import {
  getCategoriesByChampionship,
  createCategory,
} from "../controllers/Categories.js";

const router = express.Router();

router.get("/categories", getCategoriesByChampionship);
router.post("/categories", createCategory);

export default router;
