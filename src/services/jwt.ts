import jwt from "jsonwebtoken";

export class JwtService {
  private readonly secret: string;

  constructor(secret: string = process.env.JWT_SECRET || "") {
    this.secret = secret;
  }

  public sign(payload: any): string {
    return jwt.sign(payload, this.secret);
  }

  public verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
