import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  findByName(name: string): Promise<Specification> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }
}
