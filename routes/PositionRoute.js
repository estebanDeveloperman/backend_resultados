import express from "express";
import {
  getPositionByPhase,
  createPosition,
  updatePosition,
} from "../controllers/Positions.js";

const router = express.Router();

router.get("/position/:idphase", getPositionByPhase);
router.post("/position", createPosition);
router.patch("/position", updatePosition);

export default router;
