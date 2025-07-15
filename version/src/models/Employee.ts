import type { Department } from "./Department";
import type { User } from "./User";
import type { Task } from "./Task";

export interface Employee {
  id?: string;
  name: string;
  phone: string;
  department?: Department;
  departmentName?:string;
  dateJoined?: string;
  status?: boolean;
  user?: User;
  tasks?: Task[];
  imageUrl: string;
}