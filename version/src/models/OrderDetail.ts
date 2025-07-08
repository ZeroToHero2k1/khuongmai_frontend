import type { Order } from "./Order";
import type { Product } from "./Product";
import type { Warehouse } from "./Warehouse";

export interface OrderDetail {
  id?: string;
  order?: Order;
  product?: Product;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  warehouse?: Warehouse;
}