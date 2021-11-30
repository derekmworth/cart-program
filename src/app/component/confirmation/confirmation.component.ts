import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  providers: [DatePipe]
})
export class ConfirmationComponent implements OnInit {

  // Print confirmation button
  printPage() {
    window.print();
  }

  // Date Placed
  today: number = Date.now();


  constructor(private cartService : CartService) { }

  ngOnInit(): void {
  }

  // Storefront button (when clicked)
  emptyCart() {
    this.cartService.removeAllCart();
  }

}
