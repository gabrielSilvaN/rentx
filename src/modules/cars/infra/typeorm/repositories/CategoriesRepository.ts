import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import {
  ICategoriesRepository,
  ICategoryDTO,
} from "../../../repositories/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: {
        name,
      },
    });

    return category;
  }
}
