import { ObjectId } from "mongoose";
import {
  KitType,
  ProductBrand,
  ProductCategory,
  ProductSize,
  ProductStatus,
} from "../enums/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  kitType?: KitType;
  productBrand: ProductBrand;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productColor?: string;
  productDesc: string;
  productImages: string[];
  productViews: number;
  productLikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  productStatus?: ProductStatus;
  productCategory: ProductCategory;
  kitType?: KitType;
  productBrand: ProductBrand;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productColor?: string;
  productDesc: string;
  productImages?: string[];
  productViews?: number;
  productLikes?: number;
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory;
  kitType?: KitType;
  productBrand?: ProductBrand;
  productName?: string;
  productPrice?: number;
  productLeftCount?: number;
  productSize?: ProductSize;
  productColor?: string;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
  productLikes?: number;
}
