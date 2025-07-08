import type { Employee } from "./Employee";

export interface Department {
  id?: string;
  name: string;
  employeeList?: Employee[];
}