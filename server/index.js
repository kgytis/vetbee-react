import "dotenv/config";
import express from "express";

// Route imports
import apiPetsRouter from "./routes/API/pets.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiPetsRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT http://localhost:${port}`);
});
