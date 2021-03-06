import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CartService } from 'src/app/service/cart.service';
import { Product } from '../../product/product.model';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/service/shared.service';


interface Month {
  month: string;
}
interface Year {
  year: number;
}


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [DatePipe],
})

export class PaymentComponent implements OnInit {

  formGroup: FormGroup;


  // Credit card expiration date
  monthControl = new FormControl('', Validators.required);
  yearControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  months: Month[] = [
    { month: 'January' },   { month: 'February' },
    { month: 'March' },     { month: 'April' },
    { month: 'May' },       { month: 'June' },
    { month: 'July' },      { month: 'August' },
    { month: 'September' }, { month: 'October' },
    { month: 'November' },  { month: 'December' },
  ];
  years: Year[] = [
    { year: 2021 }, { year: 2022 },
    { year: 2023 }, { year: 2024 },
    { year: 2025 }, { year: 2026 },
    { year: 2027 }, { year: 2028 },
    { year: 2029 }, { year: 2030 },
  ];
  value: any;

  // Validation requirements (Forms must be filled before button activates)
  constructor(private formBuilder: FormBuilder, private cartService: CartService, private sharedService: SharedService
    ) {
    this.formGroup = this.formBuilder.group ({
      fullName: new FormControl('', [Validators.required]),
      ccNum: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
    });
  }

  // discount/total
  public item: Product[] = [];

  public subTotal: number = 0;
  public grandTotal: number = 0;
  public totalDiscount: number = 0;

  // public codeText = this.sharedService.getDiscountCode();
  // public discountSubscription !: Subscription;
  public codeText !: string;
  subscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => {
      this.item = res;
      this.subTotal = this.cartService.getCartTotal();
    });

    for(var item of this.item) {
      this.subTotal += eval(item.price) * item.quantity;
      this.grandTotal += eval(item.total) * item.quantity;
      this.totalDiscount += eval(item.discount) * item.quantity;
    }

    this.subscription = this.sharedService.getCode().subscribe(code => this.codeText = code);
    console.log(this.codeText);
  }

  // applyDiscount() {
  //   this.subscription = this.sharedService.getCode().subscribe(code => this.codeText = code);
  //   console.log(this.codeText);
  // }

  // Purchase agreement checkmark toggle/date
  isClicked = false;

  today: number = Date.now();
}


