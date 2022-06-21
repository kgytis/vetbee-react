import express from "express";

// Controllers imports
import { allMeds, newMed } from "../../controllers/API/meds.js";
const apiMedsRouter = express.Router();

apiMedsRouter.get("/meds", allMeds);
apiMedsRouter.post("/meds", newMed);

export default apiMedsRouter;
