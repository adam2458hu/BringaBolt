import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
	name : 'pointReplacer'
})

export class PointReplacerPipe implements PipeTransform {
	transform(value: string): string {
		if (value) {
			//return value.replace(new RegExp(',','g'),'.');
			return value.replace(/,/g,'.');
		}
		return '';
	}
}