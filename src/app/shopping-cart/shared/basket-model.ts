export interface BasketModel {
  id: number;
  quantity: number;
  categoryId: number;
  categoryName: string;
  productId: number;
  productName: string;
  productPrice: number;
  unitsInStock: number;
  orderId: number;
}
