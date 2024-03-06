import User from "../typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";

import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
