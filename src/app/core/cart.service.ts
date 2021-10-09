import { Injectable,Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedProduct } from '../product/shared/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: SelectedProduct[]=[];
  cartChange: BehaviorSubject<any> = new BehaviorSubject<any>(this.cart);

  constructor() {}

  addToCart(productToAdd) {
    let indexOfProductFound = this.cart.findIndex(product=>product.name===productToAdd.name 
        && product.selectedColor===productToAdd.selectedColor
        && product.selectedSize===productToAdd.selectedSize);
    
    if (indexOfProductFound>=0) {
      this.cart[indexOfProductFound].selectedQuantity+=productToAdd.selectedQuantity;
    } else {
      this.cart.push(productToAdd);
    }
    this.cartChange.next(this.cart);
  }

  changeQuantity(indexOfProduct,valueOfChange) {
    if (this.cart[indexOfProduct].selectedQuantity+valueOfChange>0) {
      this.cart[indexOfProduct].selectedQuantity+=valueOfChange;
      this.cartChange.next(this.cart);
    }
  }

  changeQuantityToValue(indexOfProduct,value) {
    if (value>0) {
      this.cart[indexOfProduct].selectedQuantity=value;
      this.cartChange.next(this.cart);
    }
  }

  deleteProduct(productToDelete) {
    this.cart = this.cart.filter(product=>product!=productToDelete);
    this.cartChange.next(this.cart);
  }

  getCart(){
    return this.cart;
  }

  getItemCount(){
    let itemCount=0;
    this.cart.forEach(product=>{
      itemCount+=product.selectedQuantity;
    })
    return itemCount;
  }

  getTotalValue(){
    let totalValue=0;
    this.cart.forEach(product=>{
      totalValue+=product.price*product.selectedQuantity;
    })
    return totalValue;
  }

  getShippingFee(){
    return this.getTotalValue()>50000?0:990;
  }

  isAnyProductOutOfStock(){
    return this.cart.some(product=>product.isInStock===false);
  }
}
