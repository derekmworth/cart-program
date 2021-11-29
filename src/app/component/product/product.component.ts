import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList : Product[] = [];
  public filterCategory : any;
  searchKey: string = "";
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a : Product) => {
        if(a.category == "men's clothing" || a.category == "women's clothing") {
          a.category = "fashion";

        }
        Object.assign(a, {quantity: 1, total: a.price});
      });

    })

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  addToCart(item : Product) {
    this.cartService.addToCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList
    .filter((a: any) => {
      if(a.category == category || category == '') {
        return a;
      }
    })
  }

}
