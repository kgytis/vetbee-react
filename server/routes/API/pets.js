import express from "express";

// Controllers imports
import {
  allPets,
  newPet,
  deletePet,
  getOnePet,
} from "../../controllers/API/pets.js";

const apiPetsRouter = express.Router();

apiPetsRouter.get("/pets", allPets);
apiPetsRouter.post("/pets", newPet);
apiPetsRouter.delete("/pets/:id", deletePet);
apiPetsRouter.get("/pets/:id", getOnePet);

export default apiPetsRouter;
