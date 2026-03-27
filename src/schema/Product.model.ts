import mongoose, { Schema } from "mongoose";
import {
  KitType,
  ProductBrand,
  ProductCategory,
  ProductSize,
  ProductStatus,
} from "../libs/enums/product.enum";

// schema
const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },

    productCategory: {
      type: String,
      enum: ProductCategory,
      required: true,
    },

    kitType: {
      type: String,
      enum: KitType,
    },

    productBrand: {
      type: String,
      enum: ProductBrand,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productLeftCount: {
      type: Number,
      required: true,
    },

    productSize: {
      type: String,
      enum: ProductSize,
      required: true,
    },

    productColor: {
      type: String,
    },

    productDesc: {
      type: String,
      required: true,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      required: true,
      default: 0,
    },

    productLikes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }, // createdAt, updatedAt
);

// Duplicate prevention
productSchema.index(
  { productName: 1, productSize: 1, productBrand: 1 },
  { unique: true },
);

// model
export default mongoose.model("Product", productSchema); // productModel
