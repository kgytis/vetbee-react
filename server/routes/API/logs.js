import express from "express";

// Controllers imports
import { allLogs, newLog } from "../../controllers/API/logs.js";
const apiLogsRouter = express.Router();

apiLogsRouter.get("/logs/:id", allLogs);
apiLogsRouter.post("/logs/:id", newLog);

export default apiLogsRouter;
