import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../component/checkout/userInfo.model';


@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private userInfo = new BehaviorSubject<UserInfo>(new UserInfo('', '', '', '', '', '', '', ''));
  currentUserInfo = this.userInfo.asObservable();


  constructor() { }

  updateCurrentBillingInfo(updatedUserInfo: UserInfo) {
    this.userInfo.next(updatedUserInfo);
  }

}
