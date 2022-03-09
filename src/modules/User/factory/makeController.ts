import { UserController } from "../user.controller";
import { makeUserRepository } from "./makeRepository";

export function makeUserController() {
  const userRepository = makeUserRepository();
  return new UserController(userRepository);
}
