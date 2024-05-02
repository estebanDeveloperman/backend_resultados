import express from "express";
import {
  getGroupConfigByPhase,
  createGroupConfig,
  updateGroupConfig,
} from "../controllers/GroupsConfig.js";

const router = express.Router();

router.get("/groupconfig/:idphase", getGroupConfigByPhase);
router.post("/groupconfig", createGroupConfig);
router.patch("/groupconfig", updateGroupConfig);

export default router;
