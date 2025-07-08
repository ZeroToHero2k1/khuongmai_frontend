import type { Order } from "./Order";
import type { Task } from "./Task";

export interface Status {
  id?: string;
  name: string;
  orderList?: Order[];
  taskList?: Task[];
}