import { AclActions, AclModules } from "types/AclConfig";
import { NextFunction, Request, Response } from "express";
import { makeUserRepository } from "modules/User/factory/makeRepository";
import { UnauthorizedError } from "server/errors/UnauthorizedError";
import { AclQuery } from "types/AclConfig";
import { AclConfig, AclQuerySeparator } from "config/AclConfig";
import { AccessControlService } from "services/acl";
import { adaptError } from "server/setup/createErrorAdapter";

export function access(...queries: AclQuery[]) {
  const acl = new AccessControlService(AclConfig);
  const userRepository = makeUserRepository();

  return async (req: Request, res: Response, next: NextFunction) => {
    adaptError(res, async () => {
      for (const query of queries) {
        const [action, module] = query.split(AclQuerySeparator) as [
          AclActions,
          AclModules
        ];

        const authToken = req.headers.authorization;

        if (!authToken) {
          throw new UnauthorizedError("Unauthorized (No Token informed)");
        }

        const user = await userRepository.findByToken(authToken);

        if (!user) {
          throw new UnauthorizedError("Unauthorized (User not fount)");
        }

        const validation = acl.can(user, action, module);

        if (!validation) {
          throw new UnauthorizedError("Unauthorized (User not authorized)");
        }
      }

      next();
    });
  };
}
