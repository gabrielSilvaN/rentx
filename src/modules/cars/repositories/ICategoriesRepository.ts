import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICategoryDTO): Promise<void>;
}
