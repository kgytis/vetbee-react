import express from "express";

// Controllers imports
import { getMode, changeMode } from "../../controllers/API/mode.js";
const apiModeRouter = express.Router();

apiModeRouter.get("/mode", getMode);
apiModeRouter.patch("/mode", changeMode);
// apiModeRouter.post("/meds", newMed);

export default apiModeRouter;
