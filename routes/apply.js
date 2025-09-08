import { Router } from "express";
import * as applyController from "../controllers/apply.js";

const applyRoute = Router();

applyRoute.get("/", applyController.getApplications);

applyRoute.post("/", applyController.createApplication);

export default applyRoute;
