import express from "express";
import {
  getResultByMatch,
  createResult,
  updateResult,
} from "../controllers/Results.js";

const router = express.Router();

router.get("/result/:idmatch", getResultByMatch);
router.post("/result", createResult);
router.patch("/result", updateResult);

export default router;
