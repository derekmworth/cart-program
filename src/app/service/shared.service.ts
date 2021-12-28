import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { DiscountCode } from '../component/checkout/discount-code/discount-code.model';
import { UserInfo } from '../component/checkout/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // private discountCode = new BehaviorSubject<DiscountCode>();

    // currentDiscountCode = this.discountCode.asObservable();

    // applyDiscountCode(currentCode: DiscountCode) {
    //   this.discountCode.next(currentCode);
    // }

    // getCode() {
    //   return this.currentDiscountCode;
    // }


  codeText = new Subject<string>();

  getCode(): Observable<string> {
    return this.codeText.asObservable();

  }

  updateCode(code: string): void {
    this.codeText.next(code);
    console.log(this.codeText);
  }

  // Billing info toggle
  private userInfo = new BehaviorSubject<UserInfo>(new UserInfo('', '', '', '', '', '', '', ''));
  currentUserInfo = this.userInfo.asObservable();

  updateCurrentBillingInfo(updatedUserInfo: UserInfo) {
    this.userInfo.next(updatedUserInfo);
  }

}
