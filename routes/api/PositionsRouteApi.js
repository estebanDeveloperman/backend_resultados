import express from "express";
import { getPositionsByApi } from "../../api/PositionsApi.js";

const router = express.Router();

router.get("/positionsapi", getPositionsByApi);

export default router;
