import { JwtService } from "services/jwt";
import { UserRepository } from "../user.repository";

export function makeUserRepository() {
  const jwtService = new JwtService();
  return new UserRepository(jwtService);
}
