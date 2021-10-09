import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe ({
	name : 'getProductImages'
})

export class GetProductImagesPipe implements PipeTransform {
	transform(product: any, color: string = product.availableColors[0], index: number = 0, mode: string = 'default'): string {
		return `${environment.productImagesPath}/${product.id}/${mode}/${color}/${product.images[mode][color][index]}`;
	}
}