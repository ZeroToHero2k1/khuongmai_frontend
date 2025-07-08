import type { Role } from "./Role";

export interface Permission {
  permissionId?: string;
  permissionName: string;
  roles?: Role[];
}