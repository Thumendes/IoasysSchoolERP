import { Response } from "express";
import { HttpError } from "types/HttpError";

export async function adaptError(res: Response, handler: () => Promise<void>) {
  try {
    await handler();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({
        status: error.status,
        error: { message: error.message },
      });
    }

    console.log(error);

    res.sendStatus(500);
  }
}
