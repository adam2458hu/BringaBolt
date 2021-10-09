import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

import { CartComponent } from './cart.component';
import { CartPreviewComponent } from './cart-preview/cart-preview.component';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';

@NgModule({
	declarations : [
		CartComponent,
  		CartPreviewComponent,
    	CartItemListComponent
	],
	imports : [
		SharedModule,
		CartRoutingModule
	],
	exports : [
		CartPreviewComponent,
		CartItemListComponent
	]
})
export class CartModule {}