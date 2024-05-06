import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";

import EtherealMail from "@config/mail/EtherealMail";

import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.");
    }

    const token = await userTokensRepository.generate(user.id);

    if (!token) {
      throw new AppError("Error generating token");
    }

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token.token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
