import { Roles, User } from "@prisma/client";
import { db } from "prisma/client";
import { JwtService } from "services/jwt";
import { HttpError } from "types/HttpError";

export class UserRepository {
  constructor(private readonly jwtService: JwtService) {}

  async findAll() {
    return await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async findById(id: string) {
    return await db.user.findFirst({ where: { id } });
  }

  async create(entity: User) {
    const userExists = await this.findByEmail(entity.email);

    if (userExists) {
      throw new HttpError(400, "User already exists");
    }

    const user = await db.user.create({ data: entity });

    if (user.role !== Roles.ADMIN) {
      switch (user.role) {
        case Roles.STUDENT:
          await db.student.create({ data: { userId: user.id } });
          break;

        case Roles.TEACHER:
          await db.teacher.create({ data: { userId: user.id } });
          break;
      }
    }

    return user;
  }

  async update(id: string, entity: User) {
    return await db.user.update({ where: { id }, data: entity });
  }

  async delete(id: string) {
    return await db.user.delete({ where: { id } });
  }

  async authenticate({ id }: User) {
    const token = this.jwtService.sign({ id });

    return token;
  }

  async findByEmail(email: string) {
    return await db.user.findFirst({ where: { email } });
  }

  async findByToken(headerAuthorization: string) {
    const [, jwtToken] = headerAuthorization.split(" ");

    if (!jwtToken) {
      throw new HttpError(401, "Invalid token");
    }

    const payload = await this.jwtService.verify(jwtToken);

    const user = await this.findById(payload.id);

    return user;
  }
}
