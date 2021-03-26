import { Operation } from "./operation";
import { Role } from "./role";

export const PERMISSIONS_BY_ROLE = {
  [Role.ADMIN]: {
    dashboard: true,
    operations: {
      [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
      [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN],
      [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    },
  },
  [Role.MODERATOR]: {
    dashboard: true,
    operations: {
      [Role.ADMIN]: [],
      [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
      [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    },
  },
  [Role.CLIENT]: {
    dashboard: false,
    operations: {
      [Role.ADMIN]: [],
      [Role.MODERATOR]: [],
      [Role.CLIENT]: [],
    },
  },
} as const;

export type PERMISSIONS_BY_ROLE_TYPE = typeof PERMISSIONS_BY_ROLE;
export type UserPermissions = PERMISSIONS_BY_ROLE_TYPE[Role];
