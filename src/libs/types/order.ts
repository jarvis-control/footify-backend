import { ObjectId } from "mongoose";
import { OrderStatus } from "../enums/order.enum";

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
}

// Input -> Jersey(3), Socks(2), Ball(1) => all go to Order
export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: ObjectId;
  orderId?: ObjectId;
}
