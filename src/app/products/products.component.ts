import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[];
  productsReceived: boolean=false;
  filter: any={};
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('category')) {
      this.filter.category = this.route.snapshot.paramMap.get('category');
    }
    if (this.route.snapshot.paramMap.get('subcategory')) {
      this.filter.subcategory = this.route.snapshot.paramMap.get('subcategory');
    }
    console.log(this.filter);

    this.productService.fetchProducts(this.filter).subscribe(
        (res:any)=>{
          this.products=res;
          this.productsReceived=true;
          console.log(this.products);
        },
        (err)=>{
          console.log(err);
        }
      )
  }

}
