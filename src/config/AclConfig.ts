import { Roles } from "@prisma/client";
import { AclActions, AclConfigType, AclModules } from "types/AclConfig";

export const AclQuerySeparator = "-";

export const AclConfig: AclConfigType = {
  modules: [
    AclModules.Class,
    AclModules.Exam,
    AclModules.Grade,
    AclModules.Student,
    AclModules.Subject,
    AclModules.Teacher,
    AclModules.User,
  ],
  roles: [Roles.ADMIN, Roles.STUDENT, Roles.TEACHER],
  permissions: {
    [Roles.ADMIN]: {
      can: [
        AclActions.Create,
        AclActions.Read,
        AclActions.Update,
        AclActions.Delete,
      ],
      modules: [
        AclModules.Class,
        AclModules.Student,
        AclModules.Subject,
        AclModules.Teacher,
        AclModules.User,
      ],
    },

    [Roles.TEACHER]: {
      can: [
        AclActions.Create,
        AclActions.Read,
        AclActions.Update,
        AclActions.Delete,
      ],
      modules: [AclModules.Exam, AclModules.Grade],
    },

    [Roles.STUDENT]: {
      can: [AclActions.Read],
      modules: [AclModules.Exam, AclModules.Grade],
    },
  },
};
