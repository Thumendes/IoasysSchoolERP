import { HttpError } from "types/HttpError";

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}
