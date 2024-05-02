import express from "express";
import { getMatchesByPhaseApi } from "../../api/MatchesApi.js";

const router = express.Router();

router.get("/matchapi", getMatchesByPhaseApi);

export default router;
