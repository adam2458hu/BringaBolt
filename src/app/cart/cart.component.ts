import { Component, OnInit, HostListener, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../core/cart.service';
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cart: any[]=[];
  cartItemCount: number;
  isAnyProductOutOfStock: boolean = false;
  shippingFee: number;
  totalValue: number;
  faShoppingCart = faShoppingCart;
  faTrashAlt = faTrashAlt;
  @ViewChild('orderQuantityInput') orderQuantityInput:ElementRef;

  constructor(private cartService: CartService,private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartChange.subscribe(
      ()=>{
        this.cart = this.cartService.getCart();
        this.totalValue = this.cartService.getTotalValue();
        this.shippingFee = this.totalValue>50000?0:990;
        this.cartItemCount = this.cartService.getItemCount();
        this.isAnyProductOutOfStock = this.cart.some(product=>product.isInStock===false);
        console.log(this.cart)
      }
    );
  }

  openCart(){
    this.router.navigate(['/cart']);
  }

  goToCheckout(){
    this.router.navigate(['/checkout']);
  }

  getProductPrice(product){
    return product.price*product.orderedQuantity;
  }

  changeQuantity(indexOfProduct,valueOfChange) {
    this.cartService.changeQuantity(indexOfProduct,valueOfChange);
  }

  changeQuantityToValue(indexOfProduct,event) {
    if (parseInt((event.target as HTMLInputElement).value)>0) {
      this.cartService.changeQuantityToValue(indexOfProduct,parseInt((event.target as HTMLInputElement).value));
    }
  }

  checkForWrongInput(indexOfProduct,event) {
    if (!this.isPositiveWholeNumberAndNotZero((event.target as HTMLInputElement).value)) {
      (event.target as HTMLInputElement).value = "1";
      this.changeQuantityToValue(indexOfProduct,event);
    }
  }

  isPositiveWholeNumberAndNotZero(value) {
    return /^[1-9]\d*$/.test(value);
  }

  deleteProduct(product){
    this.cartService.deleteProduct(product);
  }
}
