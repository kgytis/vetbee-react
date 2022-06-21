import express from "express";

// Controllers imports
import {
  allPrescriptions,
  newPrescription,
} from "../../controllers/API/prescriptions.js";
const apiPrescriptionsRouter = express.Router();

apiPrescriptionsRouter.get("/prescriptions/:id", allPrescriptions);
apiPrescriptionsRouter.post("/prescriptions/:id", newPrescription);

export default apiPrescriptionsRouter;
