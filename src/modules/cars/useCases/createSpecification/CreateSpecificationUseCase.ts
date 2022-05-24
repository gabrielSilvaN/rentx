import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ description, name }: IRequest) {
    const specificationAlreadExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadExists)
      throw new Error("Specification Already Exists");

    this.specificationRepository.create({
      name,
      description,
    });
  }
}
