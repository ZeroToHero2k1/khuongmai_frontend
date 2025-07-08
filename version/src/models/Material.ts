import type { MaterialImage } from "./MaterialImage";

export interface Material {
  id?: string;
  name: string;
  quantityInStock?: number;
  unit?: string;
  unitPrice?: number;
  supplier?: string;
  description?: string;
  images?: MaterialImage[];
}