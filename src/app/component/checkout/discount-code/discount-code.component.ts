import { Component, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.scss']
})
export class DiscountCodeComponent implements OnInit {

  // Discount Code
  form: FormGroup;
  discountCode = '';
  showValidation = '';


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      discountCode: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onCodeButton() {
    if (this.form.value.test == '' || this.form.value.test == 'CPE20') {
      this.showValidation = 'Valid Code';
    }
    else {
      this.showValidation = 'Invalid Code';
    }
    console.log(this.showValidation);
  }

}
