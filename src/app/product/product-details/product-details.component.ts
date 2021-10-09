import { Component, OnInit, AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SelectedProduct } from '../shared/product';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../core/cart.service';
import { ProductImageViewerService } from '../../core/product-image-viewer.service';
import { faTruck,faWrench,faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product: SelectedProduct;
  orderedQuantity: number=1;
  productDetailsReceived:boolean;
  faTruck = faTruck;
  faWrench = faWrench;
  faMoneyBillWave = faMoneyBillWave;
  @ViewChild('orderQuantity',{static: false}) orderQuantity: ElementRef;
  @ViewChild('addToCartBlock') addToCartBlock: ElementRef;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private productImageViewerService: ProductImageViewerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productDetailsReceived=false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params=>{
      this.productService.fetchProductBySlug(params['slug']).subscribe(
      (res: any)=>{
        this.product = new SelectedProduct(res);
        this.productDetailsReceived=true;
      },
      (err)=>{
        if (err.status===404) {
          this.router.navigate(['/404']);
        }
        console.log(err);
      })
    });
  }

  selectColor(color: string){
    this.product.selectedColor = color;
  }

  selectSize(size: string){
    this.product.selectedSize = size;
    this.orderQuantity.nativeElement.value = 1;
  }

  selectQuantity(){
    this.product.selectedQuantity = parseInt(this.orderQuantity.nativeElement.value);
  }

  addToCart() {
    this.cartService.addToCart(cloneDeep(this.product));
  }

  shrinkAddToCartBlock(shrink: boolean){
    if (shrink) {
      this.addToCartBlock.nativeElement.classList.add("shrink");
    } else {
      this.addToCartBlock.nativeElement.classList.remove("shrink");
    }
  }

  openProductImageViewer(productImageViewerMode: string){
    this.productImageViewerService.productImageViewer.open(this.product,productImageViewerMode);
  }
  /*product:Product;
  orderedQuantity: number=1;
  selectedColor:string;
  selectedSize:string;
  stockQuantity:number;
  productDetailsReceived:boolean;
  faTruck = faTruck;
  faWrench = faWrench;
  faMoneyBillWave = faMoneyBillWave;
  @ViewChild('orderQuantity',{static: false}) orderQuantity: ElementRef;
  @ViewChild('addToCartBlock') addToCartBlock: ElementRef;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private productImageViewerService: ProductImageViewerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productDetailsReceived=false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params=>{
      this.productService.fetchProductBySlug(params['slug']).subscribe(
      (res: any)=>{
        this.product=res;
        this.selectDefaultModel();
        this.productDetailsReceived=true;
      },
      (err)=>{
        if (err.status===404) {
          this.router.navigate(['/404']);
        }
        console.log(err);
      })
    });
  }

  selectDefaultModel(){
    this.selectedColor = this.product.productsInStock?Object.keys(this.product.productsInStock)[0]:Object.keys(this.product.availableColors)[0];
    this.selectedSize = this.product.productsInStock?Object.keys(this.product.productsInStock[this.selectedColor])[0]:this.product.availableSizes[0];
    this.recalculateStockQuantity();
  }

  selectColor(color: string){
    this.selectedColor = color;
    if (this.product.productsInStock[this.selectedColor]) {
      this.selectedSize = Object.keys(this.product.productsInStock[this.selectedColor])[0];
      this.recalculateStockQuantity();
    } else {
      this.selectedSize = this.product.availableSizes[0];
      this.stockQuantity = 0;
    }
  }

  selectSize(size: string){
    this.selectedSize = size;
    this.orderQuantity.nativeElement.value = 1;
    this.recalculateStockQuantity();
  }

  recalculateStockQuantity(){
    if (this.selectedColor && this.selectedSize && this.product.productsInStock) {
      this.stockQuantity = this.product.productsInStock[this.selectedColor][this.selectedSize];
    }
  }

  addToCart() {
    let orderedProduct: any={};
    Object.keys(this.product).forEach(key=>{
      orderedProduct[key]=this.product[key];
    });
    orderedProduct.orderedColor = this.selectedColor;
    orderedProduct.orderedSize = this.selectedSize;
    orderedProduct.orderedQuantity= parseInt(this.orderQuantity.nativeElement.value);
    orderedProduct.isInStock = this.stockQuantity>0?true:false;
    this.cartService.addToCart(orderedProduct);
  }

  shrinkAddToCartBlock(){
    this.addToCartBlock.nativeElement.classList.add("active");
  }

  growAddToCartBlock(){
    if (this.addToCartBlock.nativeElement.classList.contains("active")) {
      this.addToCartBlock.nativeElement.classList.remove("active");
    }
  }

  openProductImageViewer(type: string){
    //this.productImageViewerService.productImageViewer.open(this.product.images[type][this.selectedColor],type);
    this.productImageViewerService.productImageViewer.open(this.product,this.selectedColor,type);
  }*/
}
