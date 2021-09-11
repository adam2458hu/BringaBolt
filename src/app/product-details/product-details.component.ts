import { Component, OnInit, AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../shared/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingScreenService } from '../shared/loading-screen/loading-screen.service';
import { faTruck,faWrench,faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements AfterViewInit {
  product:any;
  productDetailsReceived:boolean;
  faTruck = faTruck;
  faWrench = faWrench;
  faMoneyBillWave = faMoneyBillWave;
  @ViewChild('product-image') productImage: ElementRef;
  @ViewChild('product-name') productName: ElementRef;
  @ViewChild('product-price') productPrice: ElementRef;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private loadingScreenService: LoadingScreenService
    ) {
    this.productDetailsReceived=false;
  }

  ngAfterViewInit(): void {
    this.loadingScreenService.setLoading(true);
    this.productService.fetchProductBySlug(this.route.snapshot.paramMap.get('slug')).subscribe(
    (res: any)=>{
      this.product=res;
      this.loadingScreenService.setLoading(false);
      this.productDetailsReceived=true;
      /*this.productImage.nativeElement.src=this.product.image;
      this.productName.nativeElement.alt=this.product.name;
      this.productName.nativeElement.innerHTML=this.product.name;
      this.productPrice.nativeElement.innerHTML=this.product.price;*/
    },
    (err)=>{
      console.log(err);
    })  
  }

}
