import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Email or password incorrect");

    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) throw new AppError("Email or password incorrect");

    const token = sign(
      {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "b733e191dd69e41592617ef627417c4c",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
