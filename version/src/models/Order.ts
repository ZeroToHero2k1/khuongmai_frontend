import type { Customer } from "./Customer";
import type { Status } from "./Status";
import type { OrderDetail } from "./OrderDetail";

export interface Order {
  id?: string;
  customer?: Customer;
  status?: Status;
  orderDate?: Date;
  deliveryDate?: Date;
  totalAmount?: number;
  orderDetailList?: OrderDetail[];
}