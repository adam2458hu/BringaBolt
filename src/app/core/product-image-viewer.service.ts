import { Injectable } from '@angular/core';
import { ProductImageViewer } from '../product/shared/product-image-viewer';

@Injectable({
  providedIn: 'root'
})
export class ProductImageViewerService {
  productImageViewer: ProductImageViewer = new ProductImageViewer();

  constructor() {
  }
}
