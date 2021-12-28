export class DiscountCode {
  public discountText: string;
  public discountAmount: number;


  constructor(discountText: string, discountAmount: number) {
    this.discountText = discountText;
    this.discountAmount = discountAmount;
  }
}
