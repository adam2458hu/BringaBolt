import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product:any;

  constructor(private http:HttpClient) { }

  fetchProducts(filters: any) {
    return this.http.get(`http://localhost:3000/api/products/`,{params: filters});
  }
}
