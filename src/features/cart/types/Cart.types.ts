import { Category } from "@/features/categories/types/CategoriesTypes";

export interface CartResponse {
  status: "success";
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id?: string;
  cartOwner?: string;
  products: CartItemType[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
}

export interface CartItemType {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
}

// export interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   image: string;
// }

export interface Brand {
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

export interface CartResponseError {
  status: "fail" | "error";
  message: string;
}
