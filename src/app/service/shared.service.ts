import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';
import { DiscountCode } from '../component/checkout/discount-code/discount-code.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private discountCode = new BehaviorSubject<DiscountCode>(new DiscountCode(''));
  currentDiscountCode = this.discountCode.asObservable();

  constructor() {}

  applyDiscountCode(currentCode: DiscountCode) {
    this.discountCode.next(currentCode);
  }

  // public codeText : any = [];

  // enterCode(code: DiscountCode) {
  //   this.codeText.push(code);
  // }

  getDiscountCode() {
    return this.discountCode.asObservable();
  }
}
