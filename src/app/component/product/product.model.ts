export class Product {
  public id: string;
  public title: string;
  public description: string;
  public category: string;
  public image: string;
  public price: string;
  public discount: string;
  public total: string;
  public quantity: number;

  constructor(id: string, title: string, description: string, category: string, image: string,
              price: string, discount: string, total: string, quantity: number) {
  this.id = id
  this.title = title;
  this.description = description;
  this.category = category;
  this.image = image;
  this.price = eval(price).toFixed(2);
  this.discount = discount;
  this.total = eval(price).toFixed(2);
  this.quantity = 0;
  }
}

