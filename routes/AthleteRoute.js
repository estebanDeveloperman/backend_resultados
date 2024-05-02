import express from "express";
import {
  getAthletes,
  createAthletes,
  updateAthletes,
} from "../controllers/Athletes.js";

const router = express.Router();

router.get("/athlete/:idmatch", getAthletes);
router.post("/athlete", createAthletes);
router.patch("/athlete", updateAthletes);

export default router;
