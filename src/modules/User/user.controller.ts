import { User } from "@prisma/client";
import { UnauthorizedError } from "server/errors/UnauthorizedError";
import { HttpPayload } from "types/HttpPayload";
import { UserRepository } from "./user.repository";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll({}: HttpPayload) {
    return await this.userRepository.findAll();
  }

  async findById({ params: { id } }: HttpPayload) {
    return await this.userRepository.findById(id);
  }

  async create({ data }: HttpPayload<User>) {
    return await this.userRepository.create(data);
  }

  async update({ data, params: { id } }: HttpPayload<User>) {
    return await this.userRepository.update(id, data);
  }

  async delete({ params: { id } }: HttpPayload) {
    return await this.userRepository.delete(id);
  }

  async authenticate({ data }: HttpPayload<User>) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (user.password !== data.password) {
      throw new UnauthorizedError("Invalid password");
    }

    const token = await this.userRepository.authenticate(user);

    return { user, token };
  }
}
