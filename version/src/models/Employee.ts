import type { Department } from "./Department";
import type { User } from "./User";
import type { Task } from "./Task";

export interface Employee {
  id?: string;
  name: string;
  phone: string;
  department?: Department;
  departmentName?:string;
  departmentId?:string;
  roleName?: string;
  dateJoined?: string;
  status?: boolean;
  user?: User;
  tasks?: Task[];
  imageUrl?: string;
}

export interface EmployeeCURequest {
  name: string;
  phone: string;
  dateJoined: string;
  departmentId:string;
}