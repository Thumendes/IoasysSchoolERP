import { HttpError } from "types/HttpError";

export class ServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}
