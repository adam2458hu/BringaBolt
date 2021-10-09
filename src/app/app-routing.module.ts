import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',loadChildren: ()=> import('./product/product.module').then(m=>m.ProductModule)
  },
  {
    path: 'cart',loadChildren: ()=>import('./cart/cart.module').then(m=>m.CartModule)
  },
  {
    path: 'checkout',loadChildren: ()=>import('./checkout/checkout.module').then(m=>m.CheckoutModule)
  },
  {
    path: '404',loadChildren: ()=> import('./page-not-found/page-not-found.module').then(m=>m.PageNotFoundModule)
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
