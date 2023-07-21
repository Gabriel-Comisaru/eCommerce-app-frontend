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
}
