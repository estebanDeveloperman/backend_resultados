import express from "express";
import {
  getPointByMatch,
  getPointsByFecha,
  createPoint,
  updatePoint,
} from "../controllers/Point.js";

const router = express.Router();

router.get("/point/:idmatch", getPointByMatch);
router.get("/pointfecha", getPointsByFecha);
router.post("/point", createPoint);
router.patch("/point", updatePoint);

export default router;
