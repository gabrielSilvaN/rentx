import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }
}
