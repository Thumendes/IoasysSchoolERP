import { Request, Response } from "express";
import { makeUserRepository } from "modules/User/factory/makeRepository";
import { HttpError } from "types/HttpError";
import { HttpPayload } from "types/HttpPayload";
import { adaptError } from "./createErrorAdapter";

export function createRouteAdapter(controller: any) {
  const userRepository = makeUserRepository();

  return function adaptRoute<T extends Function, Y extends any>(
    method: T,
    status = 200
  ) {
    return async (req: Request, res: Response) => {
      adaptError(res, async () => {
        const payload: HttpPayload<Y> = {
          data: req.body,
          headers: req.headers,
          params: req.params,
          query: req.query,
        };

        if (req.headers.authorization) {
          const { authorization: token } = req.headers;
          const user = await userRepository.findByToken(token);
          if (user) payload.user = user;
        }

        const result = await method.bind(controller)(payload);

        res.status(status).json(result);
      });
    };
  };
}
