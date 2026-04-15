import { ObjectId } from "mongoose";
import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

// Jersey, Socks, ball -> OrderItem => inside Order
export interface OrderItem {
  _id: ObjectId;
  itemQuantity: number;
  itemPrice: number;
  orderid: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Order is returned, when createOrder() is executed
export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  memberId: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  // from aggregate()
  orderItems: OrderItem[];
  productData: Product[];
}

// Input -> Jersey(3), Socks(2), Ball(1) => all go to Order
export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: ObjectId;
  orderId?: ObjectId;
}

// Query input (req.query) from Frontend (-> POSTMAN)
export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}
