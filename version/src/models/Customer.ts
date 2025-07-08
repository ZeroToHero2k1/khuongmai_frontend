import type { Order } from "./Order";

export interface Customer {
  id?: string;
  fullName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt?: Date;
  orderList?: Order[];
}