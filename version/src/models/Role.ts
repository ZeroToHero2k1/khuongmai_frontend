import type { Permission } from "./Permission.ts";
import type { User } from "./User";

export interface Role {
  roleId?: string;
  roleName: string;
  users?: User[];
  permissionSet?: Permission[];
}