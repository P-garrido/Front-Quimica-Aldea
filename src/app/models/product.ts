export class Product {
  id: number;
  nameProd: string;
  urlImg: string;
  description: string;
  price: number;

  constructor(id: number, nameProd: string, url: string, desc: string, price: number) {
    this.id = id;
    this.nameProd = nameProd;
    this.urlImg = url;
    this.description = desc;
    this.price = price;
  }
}