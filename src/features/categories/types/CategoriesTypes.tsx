// 1. Single Category Item
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// 2. Pagination Metadata
export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

// 3. API Response Payload
export interface CategoriesResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Category[];
}