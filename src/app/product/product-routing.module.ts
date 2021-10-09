import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: ':category/:subcategory/:slug',component: ProductDetailsComponent
  },
  {
    path: ':category/:subcategory',
    component: ProductListComponent
  },
  {
    path: ':category',
    component: ProductListComponent
  },
  {
    path: '',
    component: ProductListComponent
  }
  /*{
    path: '',
    component: ProductsListComponent,
    children : [
      {
        path: ':category/:subcategory/:slug',
        component: ProductsDetailsComponent 
      }
    ]
  }*/
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }