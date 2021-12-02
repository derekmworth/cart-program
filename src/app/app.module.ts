import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { CardModule } from 'ngx-card';
import { NgxMaskModule } from 'ngx-mask';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { MaterialModule } from './material/material.module';
import { SummaryComponent } from './component/checkout/summary/summary.component';
import { BillingComponent } from './component/checkout/billing/billing.component';
import { ShippingComponent } from './component/checkout/shipping/shipping.component';
import { PaymentComponent } from './component/checkout/payment/payment.component';
import { DiscountCodeComponent } from './component/checkout/discount-code/discount-code.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';
import { ConfirmTableComponent } from './component/confirmation/confirm-table/confirm-table.component';
import { DeleteConfirmComponent } from './component/cart/delete-confirm/delete-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    HeaderComponent,
    FilterPipe,
    CheckoutComponent,
    SummaryComponent,
    BillingComponent,
    ShippingComponent,
    PaymentComponent,
    DiscountCodeComponent,
    ConfirmationComponent,
    ConfirmTableComponent,
    DeleteConfirmComponent,
  ],

  entryComponents: [
    DeleteConfirmComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    CardModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
