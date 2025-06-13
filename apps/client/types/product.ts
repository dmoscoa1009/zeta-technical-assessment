import type { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}
