export class UserInfo {
  public name: string;
  public address: string;
  public city: string;
  public state: string;
  public zip: string;
  public country: string;
  public phone: string;
  public email: string;

  constructor(name: string, address: string, city: string, state: string, zip: string, country: string, phone: string, email: string) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
    this.phone = phone;
    this.email = email;
  }
}
