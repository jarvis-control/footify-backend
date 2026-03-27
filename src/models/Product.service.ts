import Errors, { HttpCode, Message } from "../libs/Errors";
import { ProductInput, Product } from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /** SPA (User) */

  /** SSR (Admin) */

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      // Creates a product based on input data => returns to product.controller.ts
      return await this.productModel.create(input);
    } catch (err) {
      console.error("Error, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ProductService;
