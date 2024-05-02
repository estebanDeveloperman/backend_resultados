import express from "express";
import {
  getParticipantsByPhase,
  getParticipantsByChampionshipAndCategoryAndFixture,
  createParticipant,
  getParticipantsWithInstitution,
  updateParticipant
} from "../controllers/Participants.js";

const router = express.Router();

router.get("/participantsbyphase", getParticipantsByPhase)

router.get("/participants", getParticipantsByChampionshipAndCategoryAndFixture);
router.get("/participants/institutions", getParticipantsWithInstitution);
router.post("/participants", createParticipant);
router.patch("/participants", updateParticipant)

export default router;
