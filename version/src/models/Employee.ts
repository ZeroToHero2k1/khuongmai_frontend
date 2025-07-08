import type { Department } from "./Department";
import type { User } from "./User";
import type { Task } from "./Task";

export interface Employee {
  id?: string;
  name: string;
  phone: string;
  department?: Department;
  dateJoined?: Date;
  status?: boolean;
  user?: User;
  tasks?: Task[];
}