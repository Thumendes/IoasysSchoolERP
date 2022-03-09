export class HttpError extends Error {
  public readonly status: number;
  public readonly message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}
