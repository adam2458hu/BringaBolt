import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductImageViewerComponent } from './product-image-viewer/product-image-viewer.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
	imports : [
		SharedModule,
		ProductRoutingModule
	],
	declarations : [
		ProductListComponent,
		ProductDetailsComponent,
		ProductImageViewerComponent
	]
})
export class ProductModule {}