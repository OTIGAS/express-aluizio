import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, avatar } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      avatar,
    });

    return res.json(user);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return res.json(users);
  }
}

export default UsersController;
