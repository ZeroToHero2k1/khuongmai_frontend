import type { Material } from "./Material";

export interface MaterialImage {
  id?: number;
  imageUrl: string;
  material?: Material;
}