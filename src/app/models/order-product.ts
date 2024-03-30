import { Product } from "./product";

export class OrderProduct {
  prod: Product;
  quantity: number;

  constructor(prod: Product, quan: number) {
    this.prod = prod;
    this.quantity = quan;
  }
}