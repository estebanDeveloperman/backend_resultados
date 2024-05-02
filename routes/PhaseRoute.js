import express from "express";
import {
  // getFixtureByChampionshipAndCategory,
  createPhase,
  updatePhase,
  // getPhaseDetails,
  getPhaseMerito,
  getPhases,
} from "../controllers/Phases.js";

const router = express.Router();

router.get("/phasesinfo", getPhases);

// router.get("/phases", getFixtureByChampionshipAndCategory);
// router.get("/phases/details", getPhaseDetails);
router.get("/phases/merito/:idphase", getPhaseMerito);
router.post("/phases", createPhase);
router.patch("/phases", updatePhase);

export default router;
