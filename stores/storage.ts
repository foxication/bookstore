export interface UserLocal {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

export interface Book {
  // Base
  id: number;
  title: string;
  author: string;

  // Information
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  is_discontinued: boolean;
  created_at: Date;
  updated_at: Date;
  categories: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}
