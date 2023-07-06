import { Review } from './review.model';

export interface Product {
  id: number;
  name: string;
  images: string[];
  price: number;
  rating: number;
  reviews: Review[];
  discountPercentage: number;
  description: string;
  stock: number;
  category: string;
  isDeleted: boolean;
}
