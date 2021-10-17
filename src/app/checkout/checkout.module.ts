import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CartModule } from '../cart/cart.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    SharedModule,
    CheckoutRoutingModule,
    CartModule
  ]
})
export class CheckoutModule { }
