import { Router } from "express";
import createSpecificationController from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController().handle(request, response);
});

// categoriesRoutes.get("/", (request, response) => {
//   return response.json(specificationsRepository.list());
// });

export { specificationsRoutes };
