export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: { id: string; name: string };
  description?: string;
}
