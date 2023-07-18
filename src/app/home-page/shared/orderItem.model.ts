import { Product } from './product.model';

export interface OrderItem {
  id: number;
  quantity: number;
  productId: number;
  orderId: number;
}

export interface detailedOrderItem extends OrderItem {
  productDetails: Product[];
}

export interface actionOrderItem extends OrderItem {
  action: string;
}
