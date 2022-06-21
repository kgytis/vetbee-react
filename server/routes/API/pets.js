import express from "express";

// Controllers imports
import { allPets } from "../../controllers/API/pets.js";

const apiPetsRouter = express.Router();

apiPetsRouter.get("/pets", allPets);

export default apiPetsRouter;
