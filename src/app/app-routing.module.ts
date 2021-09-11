import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component'
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'products/:category/:subcategory',component: ProductsComponent
  },
  {
    path: 'products/:category',component: ProductsComponent
  },
  {
    path: ':slug',component: ProductDetailsComponent
  },
  {
    path: '',redirectTo: '/products/bikes',pathMatch: 'full'
  },
  {
    path: '404',component: PageNotFoundComponent
  },
  {
    path: '**',redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
