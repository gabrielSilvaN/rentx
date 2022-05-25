import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryRepository = CategoriesRepository.GetInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);
