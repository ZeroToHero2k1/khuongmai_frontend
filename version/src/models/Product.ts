import type { Category } from "./Category";
import type { ProductImage } from "./ProductImage";
import type { ProductMaterial } from "./ProductMaterial";

export interface Product {
  id?: string;
  name: string;
  size?: string;
  color?: string;
  unitPrice?: number;
  category: Category;
  images?: ProductImage[];
  materials?: ProductMaterial[];
}