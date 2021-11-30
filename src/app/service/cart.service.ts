import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../component/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  cartTotalBehaviorSubject: any;

  constructor() { }

  getProduct() {
    return this.productList.asObservable();
  }

  addToCart(product : Product) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice() : number {
    let subTotal = 0;
    this.cartItemList.map((a : any) => {
      subTotal += a.total;
    });
    return subTotal;
  }

  getCartTotal() {
    var total = 0;
    for (var cartItem of this.cartItemList) {
      total += (cartItem.quantity * eval(cartItem.subTotal));
    }
    total = Math.max(total, 0);
    this.cartTotalBehaviorSubject.next(total);
    return total;
  }

  // updateValues() {
  //   var newTotal = 0;
  //   for (var cartItem of this.cartItemList) {
  //     newTotal += (cartItem.quantity * eval(cartItem.subTotal));
  //   }
  //   newTotal = Math.max(newTotal, 0);
  //   this.cartTotalBehaviorSubject.next(newTotal);
  //   return newTotal;
  // }

  // Increment/decrement cart items (not working)

  incrementItem(product : Product) {
    for( var cartItem of this.cartItemList) {
      if(product.title == cartItem.title) {
        cartItem.quantity++;
      }
    }
  //   this.updateValues();
  }

  decrementItem(product : Product) {
    for (var cartItem of this.cartItemList) {
      if(product.title == cartItem.title && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    }
    // this.updateValues();
  }

  removeCartItem(product : Product) {
    this.cartItemList.map((a : any, index : any) => {
      if(product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}

