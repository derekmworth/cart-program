import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DiscountCode } from '../component/checkout/discount-code/discount-code.model';
import { Product } from '../component/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList : any = []
  productList = new BehaviorSubject<Product[]>([]);

  public search = new BehaviorSubject<string>("");
  private cartTotalBehaviorSubject = new BehaviorSubject<number>(0);

  currentCartTotal = this.cartTotalBehaviorSubject.asObservable();
  currentCartItems = this.productList.asObservable();

  discountCode = new DiscountCode('none', 0);
  private discountCodeBehaviorSubject = new BehaviorSubject<DiscountCode>(this.discountCode);
  currentDiscountCode = this.discountCodeBehaviorSubject.asObservable();

  cartTotal = this.getCartTotal();
  cartQuantity = this.getCartQuantity();

  getProduct() {
    return this.productList.asObservable();
  }

  addToCart(item : Product) {
    this.cartItemList.push(item);
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
    total -= this.discountCode.discountAmount
    total = Math.max(total, 0);
    this.cartTotalBehaviorSubject.next(total);
    return total;
  }

  updatePrices() {
    this.cartQuantity = this.getCartQuantity();
    this.cartTotal = this.getCartTotal();
  }

  getCartQuantity() {
    var quantity = 0;
    for(var cartItem of this.cartItemList) {
      quantity += cartItem.quantity;
    }
    return quantity;
  }
  // Discount code
  addDiscount(code: DiscountCode) {
    this.discountCode = code;
    this.discountCodeBehaviorSubject.next(code);
    this.updatePrices();
  }

  // Increment/decrement cart items

  incrementItem(product : Product) {
    for( var cartItem of this.cartItemList) {
      if(product.title == cartItem.title) {
        cartItem.quantity++;
      }
    }
    this.updatePrices();
    // this.productList.next(this.cartItemList);
  }

  decrementItem(product : Product) {
    for (var cartItem of this.cartItemList) {
      if(product.title == cartItem.title && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    }
    this.updatePrices();
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

