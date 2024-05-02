import express from "express";
import { getMatchesByPhaseApi } from "../../api/MatchesApi.js";

const router = express.Router();

router.get("/matchapi/:idphase", getMatchesByPhaseApi);

export default router;
