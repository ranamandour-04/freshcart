export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface User {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review?: string;
  rating: number;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; // Optional, present only when discounted
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: Subcategory[]; // Note: represented as an array based on your original API data
  brand: Brand;
  availableColors?: string[]; // Optional in some items
  reviews?: Review[]; // Added reviews array
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ProductApiResponse {
  data: Product;
}
