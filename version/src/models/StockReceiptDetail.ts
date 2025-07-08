import type { Product } from "./Product";
import type { StockReceipt } from "./StockReceipt";
import type { Warehouse } from "./Warehouse";

export interface StockReceiptDetail {
  id?: string;
  stockReceipt?: StockReceipt;
  product?: Product;
  fromWarehouse?: Warehouse;
  toWarehouse?: Warehouse;
  quantity: number;
}