import type { Employee } from "./Employee";
import type { Role } from "./Role";

export interface User {
  id?: string;
  username: string;
  password?: string;
  employee?: Employee;
  role?: Role;
}