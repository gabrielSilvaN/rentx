import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hashSync } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ driver_license, email, name, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if(userAlreadyExists) throw new AppError('User Already exists');

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: hashSync(password, 8),
    });
  }
}
