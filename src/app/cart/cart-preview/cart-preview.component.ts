import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedProduct } from '../../product/shared/product';
import { CartService } from '../../core/cart.service';
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit, AfterViewInit {
  cart: SelectedProduct[]=[];
  cartItemCount: number;
  isAnyProductOutOfStock: boolean = false;
  shippingFee: number;
  totalValue: number;
  faShoppingCart = faShoppingCart;
  faTrashAlt = faTrashAlt;
  @ViewChild('cartButton') cartButton: ElementRef;
  @ViewChild('orderQuantityInput') orderQuantityInput:ElementRef;

  constructor(private cartService: CartService,private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartChange.subscribe(
      ()=>{
        this.cart = this.cartService.getCart();
        this.totalValue = this.cartService.getTotalValue();
        this.shippingFee = this.cartService.getShippingFee();
        this.cartItemCount = this.cartService.getItemCount();
        this.isAnyProductOutOfStock = this.cartService.isAnyProductOutOfStock();
      }
    );
  }

  ngAfterViewInit(): void {
    let cartButtonWidth = parseInt(getComputedStyle(this.cartButton.nativeElement).getPropertyValue('width').replace('px',''));
    let cartPreviewTriangleWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cart-preview-triangle-width').replace('px',''));
    document.documentElement.style.setProperty('--cart-preview-triangle-right-offset',cartButtonWidth/2-cartPreviewTriangleWidth/2+'px');
  }

  openCart(){
    this.router.navigate(['/cart']);
  }

  goToCheckout(){
    this.router.navigate(['/checkout']);
  }

  /*getProductPrice(product){
    return product.price*product.orderedQuantity;
  }*/

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
