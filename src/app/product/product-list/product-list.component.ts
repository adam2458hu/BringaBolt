import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { Product } from '../shared/product';
import { faSort,faSortAmountDown, faSortAmountUp, faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productsReceived: boolean=false;
  filter: any={};
  faSort = faSort;
  faSortAmountUp = faSortAmountUp;
  faSortAmountDown = faSortAmountDown;
  faSortAlphaUp = faSortAlphaUp;
  faSortAlphaDown = faSortAlphaDown;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
        //this.filter = {};
        if (params['category']) this.filter.category = params['category'];
        if (params['subcategory']) this.filter.subcategory = params['subcategory'];

        if (this.filter.category) {
          this.productService.fetchProductsByCategory(this.filter).subscribe(
            (res:any)=>{
              this.products=res;
              this.productsReceived=true;
            },
            (err)=>{
              console.log(err);
            }
          )
        } else {
          this.productService.fetchProducts().subscribe(
            (res:any)=>{
              this.products=res;
              this.productsReceived=true;
            },
            (err)=>{
              console.log(err);
            }
          )
        }
      })
  }

  sortProducts(property: string,ascending: boolean) {
    if (property==='price') {
      this.products = this.products.sort((a,b)=>{
        if (ascending) {
          return a[property]-b[property];
        } else {
          return b[property]-a[property];
        }
      })
    } else {
      if (ascending) {
        this.products = this.products.sort((a,b)=>{
          if (a.name>b.name) {
            return 1;
          } else if (a.name<b.name){
            return -1;
          }
          return 0;
        });
      } else {
        this.products = this.products.sort((a,b)=>{
          if (a.name<b.name) {
            return 1;
          } else if (a.name>b.name){
            return -1;
          }
          return 0;
        });
      }
    }

    console.log(this.products)
  }

}
