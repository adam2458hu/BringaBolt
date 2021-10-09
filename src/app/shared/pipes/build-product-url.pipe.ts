import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
	name : 'buildProductUrl'
})
export class BuildProductUrlPipe implements PipeTransform {
	transform(product: any): string {
		let productUrl = '/products/';
		product.categories.forEach(category=>{
			productUrl+=category+'/';
		})
		return productUrl+=product.slug;
	}
}