
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  image?: string;
  category?: string;
  badge?: string;
  rating?: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  badge?: string;
  rating?: number;
  stock: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}
