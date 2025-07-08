import type { InventoryId } from "./InventoryId";
import type { Product } from "./Product";
import type { Warehouse } from "./Warehouse";

export interface Inventory {
  id?: InventoryId;
  product?: Product;
  warehouse?: Warehouse;
  quantityInStock?: number;
  lastUpdated?: Date;
}