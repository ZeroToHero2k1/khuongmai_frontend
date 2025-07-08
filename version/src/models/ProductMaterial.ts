import type { Material } from "./Material";
import type { Product } from "./Product";

export interface ProductMaterial {
  id?: string;
  product?: Product;
  material?: Material;
  quantityUsed?: number;
  unit?: string;
}