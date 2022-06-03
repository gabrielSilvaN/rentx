import { Specification } from "../model/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
