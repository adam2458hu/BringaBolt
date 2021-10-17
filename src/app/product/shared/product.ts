export class Product {
	id: number;
	categories: string[];
	brand: string;
	name: string;
	slug: string;
	price: number;
	discountPercentage: number;
	images: {
		[type: string]: {
			[color: string] : string[]
		}
	};
	availableColors: string[];
	availableSizes: string[];
	productsInStock: {
		[color:string]: {
			[size:number]:number
		}
	}

	constructor(product: Product){
		this.id = product.id;
		this.categories = product.categories;
		this.brand = product.brand;
		this.name = product.name;
		this.slug = product.slug;
		this.price = product.price;
		this.discountPercentage = product.discountPercentage;
		this.images = product.images;
		this.availableColors = product.availableColors;
		this.availableSizes = product.availableSizes;
		this.productsInStock = product.productsInStock;
	}
}

export class SelectedProduct extends Product {
	private _selectedColor: string;
	private _selectedSize: string;
	private _selectedQuantity: number;

	constructor(product: Product) {
		super(product);
		/*ha van raktáron valamelyik modell, akkor az első talált modell színének és méretének
		kiválasztása alapértelmezett választásként, egyébként az előrendelhető modellek közül
		az első talált változat színének és méretének kiválasztása*/
		this._selectedColor = this.productsInStock?Object.keys(this.productsInStock)[0]:this.availableColors[0];
    	this._selectedSize = this.productsInStock?Object.keys(this.productsInStock[this._selectedColor])[0]:this.availableSizes[0];
		this._selectedQuantity = 1;
	}

	get stockQuantity() {
		if (this.productsInStock && this.productsInStock[this._selectedColor] && (typeof this.productsInStock[this._selectedColor][this._selectedSize] !== 'undefined')) {
			return this.productsInStock[this._selectedColor][this._selectedSize];
		} else {
			return 0;
		}
	}

	get isInStock() {
		return this.stockQuantity>0?true:false;
	}

	get selectedColor(){
		return this._selectedColor;
	}

	get selectedSize(){
		return this._selectedSize;
	}

	get selectedQuantity(){
		return this._selectedQuantity;
	}

	set selectedQuantity(value: number) {
		this._selectedQuantity = value;
	}

	set selectedSize(size: string) {
		this._selectedSize = size;
	}

	set selectedColor(color: string){
		this._selectedColor = color;

		if (this.productsInStock[this._selectedColor]) {
	      this._selectedSize = Object.keys(this.productsInStock[this._selectedColor])[0];
	    } else {
	      this._selectedSize = this.availableSizes[0];
	    }
	}
}
