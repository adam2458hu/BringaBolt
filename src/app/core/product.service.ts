import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product:any;

  constructor(private http:HttpClient) { }

  fetchProducts() {
    return this.http.get(`http://localhost:3000/api/products/`);
  }

  fetchProductsByName(name:any){
    return this.http.get(`http://localhost:3000/api/products/getProductsByName/${name}`);
  }
  
  fetchProductsByCategory(filter:any){
    return this.http.get('http://localhost:3000/api/products/getProductsByCategory',{params:filter});
  }

  fetchProductBySlug(slug:string){
    return this.http.get(`http://localhost:3000/api/products/getProductBySlug/${slug}`);
  }

  fetchProductImages(id: number,type: string,color: string){
    return this.http.get(`http://localhost:3000/api/products/getProductImages/${id}/${type}/${color}`);
  }

  fetchProducts360degreeImagesCount(slug:string){
    return this.http.get(`http://localhost:3000/api/products/getProduct360degreeImagesCount/${slug}`);
  }

  fetchProductById(id:string){
    return this.http.get(`http://localhost:3000/api/products/getProductById/${id}`);
  }
}
