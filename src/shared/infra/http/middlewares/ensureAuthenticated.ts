import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
  name: string;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError("Token is missing", 401);

  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(
      token,
      "b733e191dd69e41592617ef627417c4c"
    ) as IPayload;

    const userRepository = new UsersRepository();

    const user = await userRepository.findById(sub);

    if (!user) throw new AppError("User not exists", 401);

    request.user = {
      id: user.id,
    };
  } catch (error) {
    console.log(error);
    throw new AppError("Invalid Token", 401);
  }
  return next();
}
