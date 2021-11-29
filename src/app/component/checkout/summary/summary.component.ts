import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../../product/product.model';

//Export interface Items for static data


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  displayedColumns: string[] = ['description', 'price', 'discount', 'quantity', 'total'];

  cartContentSubscription !: Subscription;

  public item: Product[] = [];

  public subTotal: number = 0;
  public grandTotal: number = 0;
  public totalDiscount: number = 0;
  public totalQuantity: number = 0;
  currentCartItems: any;

  constructor(private cartService : CartService) { }

  dataSource = this.cartService.getProduct();

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
