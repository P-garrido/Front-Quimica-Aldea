export class Order {
  id: number;
  date: Date;
  idUser: number;
  address: string;
  mail: string;
  phone: string;
  name: string;

  constructor(id: number, date: Date, idUser: number, address: string, mail: string, phone: string, name: string) {
    this.id = id;
    this.date = date;
    this.idUser = idUser;
    this.address = address;
    this.mail = mail;
    this.phone = phone;
    this.name = name;
  }
}