import { Router } from "express";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

// categoriesRoutes.get("/", (request, response) => {
//   return response.json(specificationsRepository.list());
// });

export { specificationsRoutes };
