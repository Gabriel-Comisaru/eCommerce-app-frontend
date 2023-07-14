import { Review } from './review.model';

export interface Product {
  id: number;
  name: string;
  imagesName: string[];
  price: number;
  rating: number;
  reviews: Review[];
  discountPercentage: number;
  description: string;
  stock: number;
  category: string;
  categoryId: number;
  isDeleted: boolean;
  productImage: any;
}
