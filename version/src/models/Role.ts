

export interface Role {
  roleId: string;
  roleName: string;
  users: User[];
  permissionSet: Permission[];
}