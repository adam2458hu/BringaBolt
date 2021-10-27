import { Component, OnInit, AfterViewInit,HostListener,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SelectedProduct } from '../shared/product';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../core/cart.service';
import { ProductImageViewerService } from '../../core/product-image-viewer.service';
import { faTruck,faWrench,faMoneyBillWave,faStar,faPencilAlt,faUser,
  faCalendarAlt,faThumbsUp,faThumbsDown,faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash-es';
import * as moment from 'moment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product: SelectedProduct;
  sortedReviews: any;
  sortBy: any={
    property : 'createdAt',
    ascending : false
  };
  ratingStatistics: any = {
    5 : {
      count: 1,
      ratio: 50
    },
    4 : {
      count : 1,
      ratio: 50
    },
    3 : {
      count : 0,
      ratio: 0
    },
    2 : {
      count : 0,
      ratio: 0
    },
    1 : {
      count : 0,
      ratio: 0
    }
  }
  orderedQuantity: number=1;
  orderWindowIsOpened: boolean=false;
  productDetailsReceived:boolean;
  productFeatureNames: any={
    frame: "Váz",
    fork : "Villa",
    rearDerailleur : "Hátsó váltó",
    frontDerailleur : "Első váltó",
    shiftAndBrakeLevers : "Fék és váltókar",
    crankset : "Hajtómű",
    casette : "Fogaskoszorú",
    chain : "Lánc",
    wheelset : "Kerékszett",
    wheelSize : "Kerékméret",
    tyres : "Gumik",
    headset : "Fejcső",
    saddle : "Nyereg",
    weight : "Súly",
    punctureProtection : "Defektvédelem",
    tyreBeadType : "Gumi perem típusa"
  };
  faTruck = faTruck;
  faWrench = faWrench;
  faMoneyBillWave = faMoneyBillWave;
  faStar = faStar;
  faPencilAlt = faPencilAlt;
  faUser = faUser;
  faCalendarAlt = faCalendarAlt;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faSquareFull = faSquareFull;
  @ViewChild('orderQuantity',{static: false}) orderQuantity: ElementRef;
  @ViewChild('addToCartBlock') addToCartBlock: ElementRef;
  @ViewChild('orderButton') orderButton: ElementRef;
  @ViewChild('orderWindow') orderWindow: ElementRef;
  @HostListener('window:click',['$event'])
  closeOpenedWindow(event){
    if (this.orderWindowIsOpened && event.target!==this.orderButton.nativeElement && !this.orderWindow.nativeElement.contains(event.target)) {
      this.toggleOrderWindow();
    }
  }

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
      this.productService.fetchProducts({slug: params['slug']}).subscribe(
        (res: any)=>{
          this.product = new SelectedProduct(res);
          if (this.product.reviews) {
            this.sortedReviews = this.sortArrayOfObjects(this.product.reviews,'createdAt',false);
          }
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

  toggleOrderWindow(){
    this.orderWindowIsOpened=!this.orderWindowIsOpened;
  }

  getRatingCount(rating: number) {
    let ratingCount = this.product.reviews && this.product.reviews.filter(review=>review.rating===rating).length;
    console.log(ratingCount)
    if (ratingCount) {
      return this.product.reviews.filter(review=>review.rating===rating).length;
    } else {
      return 0;
    }
  }

  roundToXDigits(value: number, digits: number) {
    let roundedValue = value * Math.pow(10,digits);
    roundedValue = Math.round(roundedValue);
    roundedValue = roundedValue / Math.pow(10,digits);
    return roundedValue;
  }

  getOverallRating(shouldReturnInteger: boolean){
    let sumOfRatings = 0;
    let overallRating;
    let fractionalPartOfRatingInPercentage;
    this.product.reviews.forEach(review=>sumOfRatings+=review.rating);
    overallRating = sumOfRatings/this.product.reviews.length;
    fractionalPartOfRatingInPercentage = (this.roundToXDigits(overallRating,1)-Math.trunc(overallRating))*100;
    document.documentElement.style.setProperty('--fractional-rating-percentage',`${fractionalPartOfRatingInPercentage}%`);
    if (shouldReturnInteger) {
      return Math.trunc(overallRating);
    } else {
      return this.roundToXDigits(overallRating,1);
    }
  }

  sortArrayOfObjects(arr: Array<any>, property: string,ascending: boolean): any[] {
    this.orderWindowIsOpened=false;
    this.sortBy.property = property;
    this.sortBy.ascending = ascending;

    if (moment(arr[0][property],"YYYY-MM-DD",true).isValid()){
      if (ascending) {
        arr = arr.sort((a,b) => moment(a[property],"YYYY-MM-DD").isBefore(moment(b[property],"YYYY-MM-DD"))?-1:1);
      } else {
        arr = arr.sort((a,b) => moment(b[property],"YYYY-MM-DD").isBefore(moment(a[property],"YYYY-MM-DD"))?-1:1);
      }
    } else if (typeof arr[0][property]==='string' || arr[0][property] instanceof String) {
      if (ascending) {
        arr = arr.sort((a,b)=>{
          if (a[property]>b[property]) {
            return 1;
          } else if (a[property]<b[property]){
            return -1;
          }
          return 0;
        });
      } else {
        arr = arr.sort((a,b)=>{
          if (a[property]<b[property]) {
            return 1;
          } else if (a[property]>b[property]){
            return -1;
          }
          return 0;
        });
      }
    } else {
      arr = arr.sort((a,b)=>{
        if (ascending) {
          return a[property]-b[property];
        } else {
          return b[property]-a[property];
        }
      })
    }

    return arr;
  }

  rateReview(reviewID,upvote: boolean) {
    if (upvote) {
      ++this.product.reviews.find(review=>review.id===reviewID).upvotes;
    } else {
      ++this.product.reviews.find(review=>review.id===reviewID).downvotes;
    }
  }
}
