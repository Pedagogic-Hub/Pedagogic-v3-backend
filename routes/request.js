import { Router } from "express";
import * as requestController from "../controllers/request.js";
import checkAuthenticatedUser from "../middlewares/checkAuthenticatedUser.js";

const requestRoute = Router();

requestRoute.get("/", requestController.getRequest);

requestRoute.post("/", requestController.createRequest);

requestRoute.get("/admin", requestController.getRequestAdmin);

requestRoute.post("/admin/approve", requestController.approveRequestAdmin);

requestRoute.post("/payment/:id", requestController.updatePayment);

requestRoute.post(
  "/apply",
  checkAuthenticatedUser,
  requestController.applyForRequest
);

export default requestRoute;
