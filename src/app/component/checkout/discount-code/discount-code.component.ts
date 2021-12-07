import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';
import { Subscription } from 'rxjs';
import { DiscountCode } from './discount-code.model';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss']
})
export class DiscountCodeComponent implements OnInit { //, OnDestroy


  discountCode = new DiscountCode('');
  formGroup: FormGroup;
  showValidation = false;
  validationMessage = '';
  displayText = '';


  constructor(private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.formGroup = this.formBuilder.group({
      discountCode: new FormControl('', [Validators.required]),
    });
  }

  enterCode(newCode: DiscountCode) {
    if(this.formGroup.value.discountCode == 'CPE20') {
      this.validationMessage = 'Discount code successfully applied';
      this.showValidation = true;
      this.sharedService.applyDiscountCode(newCode);
    }
    else {
      this.validationMessage = 'Invalid or expired code. Please check your code and try again.';
      this.showValidation = true;
    }
  }

  ngOnInit() { }

  // ngOnDestroy() {
  //   this.codeSubscription.unsubscribe();
  // }

}
