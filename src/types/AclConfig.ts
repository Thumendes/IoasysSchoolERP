import { Roles } from "@prisma/client";
import { AclQuerySeparator } from "config/AclConfig";

export enum AclActions {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export enum AclModules {
  User = "user",
  Class = "class",
  Student = "student",
  Teacher = "teacher",
  Subject = "subject",
  Grade = "grade",
  Exam = "exam",
}

export interface AclConfigType {
  modules: AclModules[];
  roles: Roles[];
  permissions: Record<
    Roles,
    {
      can: AclActions[];
      modules: AclModules[];
    }
  >;
}

export type AclQuery = `${AclActions}${typeof AclQuerySeparator}${AclModules}`;
