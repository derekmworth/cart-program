import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { DiscountCode } from './discount-code.model';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss']
})
export class DiscountCodeComponent implements OnInit { //, OnDestroy

  formGroup: FormGroup;
  showValidation = false;
  validationMessage = '';
  displayText = '';

  discountCode !: DiscountCode;


  constructor(private formBuilder: FormBuilder,
              private sharedService: SharedService,
              private cartService: CartService) {
    this.formGroup = this.formBuilder.group({
      discountCode: new FormControl('', [Validators.required]),
    });
  }

  enterCode() {
    if(this.formGroup.value.discountCode == 'CPE20') {
      this.cartService.addDiscount(new DiscountCode(this.formGroup.value.enteredCode, 20))
      this.validationMessage = 'Discount code successfully applied';
      this.showValidation = true;
      this.sharedService.getCode();
      // console.log(this.formGroup.value.discountCode);
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
