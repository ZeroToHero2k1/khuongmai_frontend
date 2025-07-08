import type { Product } from "./Product";

export interface ProductImage {
  id?: number;
  imageUrl: string;
  product?: Product;
}