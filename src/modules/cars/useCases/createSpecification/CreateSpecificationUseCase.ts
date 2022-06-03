import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ description, name }: IRequest) {
    const specificationAlreadExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadExists)
      throw new Error("Specification Already Exists");

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}
