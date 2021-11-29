import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../../product/product.model';


@Component({
  selector: 'app-confirm-table',
  templateUrl: './confirm-table.component.html',
  styleUrls: ['./confirm-table.component.scss']
})
export class ConfirmTableComponent implements OnInit {

  displayedColumns: string[] = ['description', 'price', 'discount', 'qty', 'total'];

  // Adding items from the cart.service component
  dataSource = this.cartService.getProduct();

  public item : Product[] = [];

  public subTotal: number = 0;
  public totalDiscount: number = 0;
  public grandTotal: number = 0;
  public totalQuantity: number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe(res => {
      this.item = res;
      this.subTotal = this.cartService.getCartTotal();
    });

    for(var item of this.item) {
      this.subTotal += eval(item.price) * item.quantity;
      this.grandTotal += eval(item.total) * item.quantity;
      this.totalDiscount += eval(item.discount) * item.quantity;
      this.totalQuantity += item.quantity;
    }
  }

}
