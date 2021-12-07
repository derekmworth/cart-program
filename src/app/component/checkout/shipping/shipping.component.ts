import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BillingService } from 'src/app/service/billing.service';
import { UserInfo } from '../userInfo.model';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  billingInfoSubscription !: Subscription;
  billingUserInfo = new UserInfo('', '', '', '', '', '', '', '');
  savedUserInfo = new UserInfo('', '', '', '', '', '', '', '');
  formGroup: FormGroup;
  useBillingInfo = false;

  constructor(formBuilder: FormBuilder, private billingService: BillingService) {
    this.formGroup = formBuilder.group(new UserInfo('', '', '', '', '', '', '', ''));
  }

  ngOnInit(): void {
    this.billingInfoSubscription = this.billingService.currentUserInfo.subscribe(userInfo => this.billingUserInfo = userInfo);
  }

  ngOnDestroy() {
    this.billingInfoSubscription.unsubscribe();
  }

  onToggleUseBilling() {
    const formBuilder = new FormBuilder;
    if(this.useBillingInfo) {
      this.savedUserInfo = this.formGroup.value;
      this.formGroup = formBuilder.group(this.billingUserInfo);
    }
  }
}
