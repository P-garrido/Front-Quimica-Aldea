export class User {
  id: number;
  username: string;
  password: string;
  adress: string;
  mail: string;
  phone: string;
  type: number;

  constructor(id: number, username: string, pass: string, adress: string, mail: string, phone: string, type: number) {
    this.id = id;
    this.username = username;
    this.password = pass;
    this.adress = adress;
    this.mail = mail;
    this.phone = phone;
    this.type = type;
  }
}