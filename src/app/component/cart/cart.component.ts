import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../product/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

// Static Items
// export interface Items {
//   image: string;
//   title: string;
//   description: string;
//   quantity: number;
//   price: number;
// }

// const TABLE_DATA: Items[] = [
//   { image: "https://doaly.com/wp-content/uploads/2020/09/Lord-of-the-rings-poster-art-doaly.jpg",
//     title: 'The Lord of the Rings: The Fellowship of the Ring',
//     description: 'Elijah Wood stars as Frodo Baggins, a Hobbit resident of the medieval "Middle-earth" who discovers that a ring bequeathed to him by beloved relative and benefactor Bilbo (Ian Holm) is in fact the "One Ring," a device that will allow its master to manipulate dark powers and enslave the world.',
//     quantity: 1, price: 15.99},
//   { image: "https://alternativemovieposters.com/wp-content/uploads/2021/02/Doaly_TwoTowers.jpg",
//     title: 'The Lord of the Rings: The Two Towers',
//     description: 'Frodo (Elijah Wood), who carries the Ring, and his fellow Hobbit Sam (Sean Astin) are lost in the hills of Emyn Muil when they encounter Gollum (Andy Serkis), a strange creature who once carried the Ring and was twisted by its power.',
//     quantity: 4, price: 15.99},
//   { image: "https://cdn.shopify.com/s/files/1/0182/2915/products/Lord-of-the-rings-return-of-the-king-poster-art-doaly_2048x.jpg?v=1619450732",
//     title: 'The Lord of the Rings: The Return of the King',
//     description: 'Continuing the plot of The Two Towers, Frodo, Sam and Gollum are making their final way toward Mount Doom in Mordor in order to destroy the One Ring, unaware of Gollum\'s true intentions, while Gandalf, Aragorn, Legolas, Gimli and the rest are joining forces together against Sauron and his legions in Minas Tirith.',
//     quantity: 6, price: 15.99},
// ];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  dataSource = this.cartService.getProduct();
  public product : Product[] = [];
  public subTotal !: number;
  public updatedTotal !: number;

  constructor(private cartService : CartService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => {
      this.product = res;
      this.subTotal = this.cartService.getTotalPrice();
      this.updatedTotal = this.cartService.updateValue();
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

  /* emptyCart() {
    this.cartService.removeAllCart();
  } */

  displayedColumns: string[] = ['image', 'description', 'quantity', 'price', 'remove'];
  // Datasource for static items
  // dataSource = TABLE_DATA;
}
