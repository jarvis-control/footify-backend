import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    itemQuantity: {
      rtpe: Number,
      required: true,
    },

    itemPrice: {
      type: Number,
      required: true,
    },

    orderid: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, collection: "orderItems" },
);

export default mongoose.model("OrderItem", orderItemSchema);
