import { OrderItem } from './orderItem.model';

export interface Order {
  id: number;
  deliveryPrice: number;
  startDate: string;
  deliveryDate: string;
  status: string;
  userId: number;
  userName: string;
  userEmail: string;
  orderItems: number[];
  productNames:string[];
  productIdsAndNames:string[]
}

export interface DetailedOrder {
  id: number;
  deliveryPrice: number;
  startDate: string;
  deliveryDate: string;
  status: string;
  userId: number;
  userName: string;
  userEmail: string;
  orderItems: OrderItem[];
}
