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

  // setProduct(product : any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }

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

  // Increment cart items (not working)

  // incrementItem(productId : string): void {
  //   this.cartItemList.map((item : Product) => {
  //     if(item.title == productId) {
  //       return {
  //         ...item,
  //         quantity : item.quantity + 1
  //       }
  //     }
  //     return item;
  //   });
  // }

  // incrementItem(product : Product) {
  //   this.cartItemList.map((a : any, index : any) => {
  //     if(product.id === a.id) {
  //       this.cartItemList + 1;
  //     }
  //   });
  // }

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

