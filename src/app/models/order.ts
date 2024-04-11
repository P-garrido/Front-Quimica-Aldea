import { OrderProduct } from "./order-product";
import { User } from "./user";

export class Order {
  id: number;
  date: Date;
  ammount: number;
  user: User | null;
  address: string | null;
  mail: string | null;
  phone: string | null;
  name: string | null;
  delivered: boolean;
  orderProducts: OrderProduct[];

  constructor(id: number, date: Date, ammount: number, user: User | null, address: string | null, mail: string | null, phone: string | null, name: string | null, delivered: boolean, ordProd: OrderProduct[]) {
    this.id = id;
    this.date = date;
    this.ammount = ammount;
    this.user = user;
    this.address = address;
    this.mail = mail;
    this.phone = phone;
    this.name = name;
    this.delivered = delivered;
    this.orderProducts = ordProd;
  }
}