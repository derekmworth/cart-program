import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../product/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  dataSource = this.cartService.getProduct();
  public product : Product[] = [];
  public subTotal !: number;
  public total !: string;
  public subTotalSubscription !: Subscription;

  constructor(private cartService : CartService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => { //
      this.product = res;
      this.subTotal = this.cartService.getTotalPrice(); // getTotalPrice()
      });
  }

  incrementItem(item : Product) {
    this.cartService.incrementItem(item);
  }

  decrementItem(item : Product) {
    this.cartService.decrementItem(item);
  }

  // Remove item (with dialog box)
  removeItem(item : Product) {
    const deleteConfirm = this.dialog.open(DeleteConfirmComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete (' + item.quantity + ') ' + item.title + '?'
      }
    });
    deleteConfirm.afterClosed().subscribe(result => {
      if(result == true) {
        this.cartService.removeCartItem(item);
      }
    });
  }

  // Remove item (without dialog box)
  /* removeItem(item : Product) {
     this.cartService.removeCartItem(item);
   } */

   emptyCart() {
     const deleteConfirm = this.dialog.open(DeleteConfirmComponent, {
       data: {
         title: 'Confirm Delete',
         message: 'Are you sure you want to delete all items from your cart?'
       }
     });
     deleteConfirm.afterClosed().subscribe(result => {
      if(result == true) {
        this.cartService.removeAllCart();
      }
     });
   }

  // Empty cart (without dialog box)
  /* emptyCart() {
    this.cartService.removeAllCart();
  } */

  displayedColumns: string[] = ['image', 'description', 'quantity', 'price', 'remove'];
}
