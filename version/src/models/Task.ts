import type { Employee } from "./Employee";
import type { Order } from "./Order";
import type { Status } from "./Status";

export interface Task {
  id?: string;
  order?: Order;
  employee?: Employee;
  status?: Status;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}