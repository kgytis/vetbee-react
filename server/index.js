import "dotenv/config";
import express from "express";

// Route imports
import apiPetsRouter from "./routes/API/pets.js";
import apiMedsRouter from "./routes/api/meds.js";
import apiLogsRouter from "./routes/api/logs.js";
import apiPrescriptionsRouter from "./routes/api/prescriptions.js";
import apiModeRouter from "./routes/API/mode.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiPetsRouter);
app.use("/api", apiMedsRouter);
app.use("/api", apiLogsRouter);
app.use("/api", apiPrescriptionsRouter);
app.use("/api", apiModeRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT http://localhost:${port}`);
});
