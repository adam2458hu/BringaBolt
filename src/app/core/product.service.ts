import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product:any;

  constructor(private http:HttpClient) { }

  fetchProducts(filters: any) {
    return this.http.get(environment.apiProductsURL,{params: filters});
  }
}
