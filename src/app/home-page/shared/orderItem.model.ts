import { Product } from './product.model';

export interface OrderItem {
  id: number;
  quantity: number;
  categoryName: string;
  productId: number;
  productName: string;
  productPrice: number;
  unitsInStock: number;
  orderId: number;
}

export interface detailedOrderItem extends OrderItem {
  productDetails: Product[];
}

export interface actionOrderItem extends OrderItem {
  action: string;
}
