import { User } from "@prisma/client";
import { AclActions, AclConfigType, AclModules } from "types/AclConfig";

export class AccessControlService {
  constructor(private readonly config: AclConfigType) {}

  can(user: User, action: AclActions, module: AclModules): boolean {
    const permissions = this.config.permissions[user.role];

    const { can, modules } = permissions;

    return can.includes(action) && modules.includes(module);
  }
}
