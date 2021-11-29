import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillingService } from 'src/app/service/billing.service';
import { UserInfo } from '../userInfo.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  eProfileTemplate = new UserInfo('Derek Worth', '475 Morgan Drive', 'Foley', 'MN', '56329', 'United States', '777-666-5555', 'dworth@nabp');
  userInfo = new UserInfo('', '', '', '', '', '', '', '');
  savedUserInfo = new UserInfo('', '', '', '', '', '', '', '');
  useSavedInfo = false;
  myFormGroup: FormGroup;


  constructor(myFormBuilder: FormBuilder, private billingService: BillingService) {
    this.myFormGroup = myFormBuilder.group(new UserInfo('', '', '', '', '', '', '', ''));
  }

  ngOnInit(): void {
  }

  updateBillingInfo() {
    this.billingService.updateCurrentBillingInfo(this.myFormGroup.value);
  }

  onToggleUserProfile() {
    const myFormBuilder = new FormBuilder;
    if (this.useSavedInfo) {
      this.savedUserInfo = this.myFormGroup.value;
      this.myFormGroup = myFormBuilder.group(this.eProfileTemplate);
    }
    else {
      this.myFormGroup = myFormBuilder.group(this.savedUserInfo);
    }

    this.updateBillingInfo;
  }
}
