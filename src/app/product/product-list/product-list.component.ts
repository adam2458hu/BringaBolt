import { Component, OnInit, HostListener, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
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
  filters: any={};
  filterWindowIsOpened: boolean=false;
  orderWindowIsOpened: boolean=false;
  sortBy: any={
    property : 'name',
    ascending : true
  }
  faSort = faSort;
  faSortAmountUp = faSortAmountUp;
  faSortAmountDown = faSortAmountDown;
  faSortAlphaUp = faSortAlphaUp;
  faSortAlphaDown = faSortAlphaDown;
  somethingIsBeingDragged: boolean = false;
  mouseDownTargetElement: any;
  sliderTrackWidth: number;
  priceHasChanged: BehaviorSubject<string> = new BehaviorSubject<string>('both');
  @ViewChild('slider1') slider1: ElementRef;
  @ViewChild('sliderTooltip1') sliderTooltip1: ElementRef;
  @ViewChild('slider2') slider2: ElementRef;
  @ViewChild('sliderTooltip2') sliderTooltip2: ElementRef;
  @ViewChild('sliderTrack') sliderTrack: ElementRef;
  @ViewChild('minLabel') minLabel: ElementRef;
  @ViewChild('maxLabel') maxLabel: ElementRef;
  @ViewChild('filterWindow') filters2: ElementRef;
  @ViewChild('filterButton') filterButton: ElementRef;
  @ViewChild('orderWindow') orderWindow: ElementRef;
  @ViewChild('orderButton') orderButton: ElementRef;

  /* Erre azért van szükség, mert például Chrome böngésző alatt
    ha a termék szűrő ablak nyitva van, és az ár input mezőben lévő értéket egérrel kijelölnénk úgy,
    hogy az egérgomb felengedése már a szűrőket tartalmazó ablakon kívül esik, akkor bezárulna
    az ablak. Ezért az ablak bezárásához azt figyeljük, hogy a kattintás kezdeti és végpontja is
    a szűrő ablakon kívül legyen. */
  @HostListener('window:mousedown',['$event'])
  onMouseDown(event){
    this.mouseDownTargetElement = event.target;
  }

  @HostListener('window:click',['$event'])
  closeOpenedWindow(event){
    if (this.filterWindowIsOpened && this.mouseDownTargetElement===event.target && event.target!==this.filterButton.nativeElement && !this.filters2.nativeElement.contains(event.target)) {
      this.toggleFilterWindow();
    }
    if (this.orderWindowIsOpened && event.target!==this.orderButton.nativeElement && !this.orderWindow.nativeElement.contains(event.target)) {
      this.toggleOrderWindow();
    }
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
        this.filters = {};
        if (params['category']) this.filters.category = params['category'];
        if (params['subcategory']) this.filters.subcategory = params['subcategory'];

        this.productService.fetchProducts(this.filters).subscribe(
          (products: Product[])=>{
            this.products=products;
            this.productsReceived=true;
            this.initializeFilters(this.filters);
          },
          (err)=>{
            console.log(err);
          }
        )
      })
  }

  get minPriceSetByUserPercentage(): number {
    return (this.minPriceSetByUser-this.minPossiblePrice)/(this.maxPossiblePrice-this.minPossiblePrice)*100;
  }

  get maxPriceSetByUserPercentage(): number {
    return (this.maxPriceSetByUser-this.minPossiblePrice)/(this.maxPossiblePrice-this.minPossiblePrice)*100;
  }

  get minPriceSetByUser(): number {
    return this.filters.price.minPriceSetByUser;
  }

  get maxPriceSetByUser(): number {
    return this.filters.price.maxPriceSetByUser;
  }

  get minPossiblePrice(): number {
    return this.filters.price.minPossiblePrice;
  }

  get maxPossiblePrice(): number {
    return this.filters.price.maxPossiblePrice;
  }

  set minPriceSetByUser(minPriceSetByUser: number) {
    this.filters.price.minPriceSetByUser = minPriceSetByUser;
    this.priceHasChanged.next('minPrice');
  }

  set maxPriceSetByUser(maxPriceSetByUser: number) {
    this.filters.price.maxPriceSetByUser = maxPriceSetByUser;
    this.priceHasChanged.next('maxPrice');
  }

  set minPossiblePrice(minPossiblePrice) {
    this.filters.price.minPossiblePrice=minPossiblePrice;
  }

  set maxPossiblePrice(maxPossiblePrice) {
    this.filters.price.maxPossiblePrice=maxPossiblePrice;
  }

  initializeFilters(filters){
    this.filters = {
      category : filters.category,
      subcategory : filters.subcategory,
      brands : [],
      wheelSizes : [],
      sizes : [],
      colors : [],
      price : {
        minPriceSetByUser : 0,
        maxPriceSetByUser : 0,
        minPossiblePrice : 0,
        maxPossiblePrice : 0
      }
    };

    this.products.forEach(product=>{
      if (!this.filters.brands.some(brand=>brand.value===product.brand)) {
        this.filters.brands.push({value: product.brand, isChecked: false});
      }

      if (product.features && product.features.wheelSize && !this.filters.wheelSizes.some(wheelSize=>wheelSize.value===product.features.wheelSize)) {
        this.filters.wheelSizes.push({value: product.features.wheelSize, isChecked: false});
      }

      product.availableSizes.forEach(availableSize=>{    
        if (!this.filters.sizes.some(size=>size.value===availableSize)) {
          this.filters.sizes.push({value: availableSize, isChecked: false});
        }
      })
    })

    this.sortProducts('price',true);
    this.minPossiblePrice = this.products[0].price;
    this.minPriceSetByUser = this.minPossiblePrice;
    this.sortProducts('price',false);
    this.maxPossiblePrice = this.products[0].price;
    this.maxPriceSetByUser = this.maxPossiblePrice;
    this.priceHasChanged.next('both');
  }

  onSliderTrackClick(event){
    let sliderTrackWidth = parseInt(getComputedStyle(this.sliderTrack.nativeElement).getPropertyValue("width").replace('px',''));
    let clickPositionRelativeToSliderTrackBeginning = event.offsetX/sliderTrackWidth;
    let distanceBetweenClickAndLeftHandle = Math.abs(this.minPriceSetByUserPercentage-clickPositionRelativeToSliderTrackBeginning*100);
    let distanceBetweenClickAndRightHandle = Math.abs(this.maxPriceSetByUserPercentage-clickPositionRelativeToSliderTrackBeginning*100);
    let setPriceRelativeToMaxPossiblePrice = Math.round(clickPositionRelativeToSliderTrackBeginning*this.maxPossiblePrice);
    /*ha a min értéket állító fogantyú van közelebb a kattintás pontjához, akkor az kapja meg
      a kattintás pontján található árat, egyébként a max értéket állító fogantyú.
      Az egyenlőség vizsgálatnak akkor van értelme ha a min. és max. ár is egyenlőre van beállítva.
      Ha az egyenlő pontban lévő két fogantyútól balra kattintunk akkor a minimum értéket,
      ha jobbra akkor pedig a maximumot állítja.
      Pl. Ha a csúszka 70 %-ára van állítva mindkettő és rákattintunk a 30%-ára akkor a minimum
      árat 30%-ra állítjuk és a maximum 70%-on marad. Ha a 80%-ára kattintanánk, akkor pedig a
      maximum értéket állítja 80%-ra a minimum pedig a helyén marad.*/
    if ((distanceBetweenClickAndLeftHandle<distanceBetweenClickAndRightHandle) ||
        (distanceBetweenClickAndLeftHandle===distanceBetweenClickAndRightHandle 
          && clickPositionRelativeToSliderTrackBeginning*100<this.minPriceSetByUserPercentage)) {
      this.minPriceSetByUser = setPriceRelativeToMaxPossiblePrice;
      (<HTMLInputElement>this.slider1.nativeElement).value=setPriceRelativeToMaxPossiblePrice.toString();
    } else if ((distanceBetweenClickAndRightHandle<distanceBetweenClickAndLeftHandle) ||
        (distanceBetweenClickAndLeftHandle===distanceBetweenClickAndRightHandle 
          && clickPositionRelativeToSliderTrackBeginning*100>this.maxPriceSetByUserPercentage)) {
      this.maxPriceSetByUser = setPriceRelativeToMaxPossiblePrice;
      (<HTMLInputElement>this.slider2.nativeElement).value=setPriceRelativeToMaxPossiblePrice.toString();
    }
  }

  checkForWrongPriceInput(event){
    if (/^-?[0-9]+$/.test(event.target.value)) {
      let value = parseInt(event.target.value);
      if (event.target.id==='minPriceSetByUser') {
        if (value>=this.minPossiblePrice && value<=this.maxPossiblePrice) {
          this.minPriceSetByUser = value;
          if (value>this.maxPriceSetByUser) {
            this.maxPriceSetByUser = value;
          }
        } else if (value<this.minPossiblePrice) {
          /*ha mínusz az érték akkor a lehetséges legkisebb értékre állítjuk */
          this.minPriceSetByUser = this.minPossiblePrice;
        } else {
          /*ha nagyobb a megadott min érték mint a lehetséges legnagyobb, akkor a
          min és a max értéket is a lehetséges legnagyobbra állítjuk */
          this.minPriceSetByUser = this.maxPossiblePrice;
          this.maxPriceSetByUser = this.maxPossiblePrice;
        }
      } else if (event.target.id==='maxPriceSetByUser') {
        if (value>=this.minPossiblePrice && value<=this.maxPossiblePrice) {
          this.maxPriceSetByUser = value;
          if (value<this.minPriceSetByUser) {
            this.minPriceSetByUser = value;
          }
        } else if (value>this.maxPossiblePrice) {
          this.maxPriceSetByUser = this.maxPossiblePrice;
        } else {
          this.minPriceSetByUser = this.minPossiblePrice;
          this.maxPriceSetByUser = this.minPossiblePrice;
        }
      }
    } else {
      if (event.target.id==='minPriceSetByUser') {
        event.target.value = this.minPriceSetByUser;
      } else if (event.target.id==='maxPriceSetByUser') {
        event.target.value = this.maxPriceSetByUser;
      }
    }
  }

  initializeSlider(){
    this.priceHasChanged.subscribe(whichPriceHasChanged=>{
      setTimeout(()=>{
        this.fillSliderTrack();
        this.repositionTooltipAndHandle(whichPriceHasChanged);
      })
    })
  }

  toggleFilterWindow(){
    this.filterWindowIsOpened = !this.filterWindowIsOpened;
    if (this.filterWindowIsOpened) {
      this.initializeSlider();
    }
  }

  toggleOrderWindow(){
    this.orderWindowIsOpened=!this.orderWindowIsOpened;
  }

  onHandleMove(minHandle?: boolean){
    if (minHandle) {
      if (this.minPriceSetByUser>=this.maxPriceSetByUser) {
        this.minPriceSetByUser=this.maxPriceSetByUser;
        (<HTMLInputElement>this.slider1.nativeElement).value=this.minPriceSetByUser.toString();
      }
    } else if (this.maxPriceSetByUser<=this.minPriceSetByUser) {
      this.maxPriceSetByUser=this.minPriceSetByUser;
      (<HTMLInputElement>this.slider2.nativeElement).value=this.maxPriceSetByUser.toString();
    }
  }

  fillSliderTrack() {
    this.renderer.setStyle(this.sliderTrack.nativeElement,'background-image',`linear-gradient(to right,white 0% ${this.minPriceSetByUserPercentage}%,#E2032D ${this.minPriceSetByUserPercentage}% ${this.maxPriceSetByUserPercentage}%,white ${this.maxPriceSetByUserPercentage}% 100%)`);
  }

  bringSliderHandleForwardVisually(minHandle: boolean){
    if (minHandle) {
      this.renderer.setStyle(this.sliderTooltip1.nativeElement,'z-index',999);
      this.renderer.setStyle(this.sliderTooltip2.nativeElement,'z-index',998);
    } else {
      this.renderer.setStyle(this.sliderTooltip1.nativeElement,'z-index',998);
      this.renderer.setStyle(this.sliderTooltip2.nativeElement,'z-index',999);
    }
  }

  repositionTooltipAndHandle(whichPriceHasChanged: string){
    let thumbWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--slider-thumb-width').replace('px',''));
    let sliderTrackWidth = parseFloat(getComputedStyle(this.sliderTrack.nativeElement).getPropertyValue("width").replace('px',''));
    if (whichPriceHasChanged==='minPrice') {
      let sliderTooltip1Width = parseFloat(getComputedStyle(this.sliderTooltip1.nativeElement).getPropertyValue("width").replace('px',''));
      let minLabelWidth = parseFloat(getComputedStyle(this.minLabel.nativeElement).getPropertyValue("width").replace('px',''));
      let thumbOffsetFromItsLeftSideInPixels = thumbWidth*this.minPriceSetByUserPercentage/100;
      let value = this.minPriceSetByUserPercentage/100*sliderTrackWidth + thumbWidth/2 - thumbOffsetFromItsLeftSideInPixels;
      this.renderer.setStyle(this.sliderTooltip1.nativeElement,'left',`calc(${this.minPriceSetByUserPercentage}% + ${thumbWidth/2}px - ${thumbOffsetFromItsLeftSideInPixels}px - ${sliderTooltip1Width/2}px)`);
      this.renderer.setStyle(this.minLabel.nativeElement,'left',`calc(${this.minPriceSetByUserPercentage}% + ${thumbWidth/2}px - ${thumbOffsetFromItsLeftSideInPixels}px - ${minLabelWidth/2}px)`);
    } else if (whichPriceHasChanged==='maxPrice'){
      let sliderTooltip2Width = parseInt(getComputedStyle(this.sliderTooltip2.nativeElement).getPropertyValue("width").replace('px',''));
      let maxLabelWidth = parseInt(getComputedStyle(this.maxLabel.nativeElement).getPropertyValue("width").replace('px',''));
      let thumbOffsetFromItsLeftSideInPixels = thumbWidth*this.maxPriceSetByUserPercentage/100;
      this.renderer.setStyle(this.sliderTooltip2.nativeElement,'left',`calc(${this.maxPriceSetByUserPercentage}% + ${thumbWidth/2}px - ${thumbOffsetFromItsLeftSideInPixels}px - ${sliderTooltip2Width/2}px)`);
      this.renderer.setStyle(this.maxLabel.nativeElement,'left',`calc(${this.maxPriceSetByUserPercentage}% + ${thumbWidth/2}px - ${thumbOffsetFromItsLeftSideInPixels}px - ${maxLabelWidth/2}px)`);
    } else if (whichPriceHasChanged==='both'){
      this.repositionTooltipAndHandle('minPrice');
      this.repositionTooltipAndHandle('maxPrice');
    }
  }

  sortProducts(property: string,ascending: boolean): Product[] {
    this.sortBy.property = property;
    this.sortBy.ascending = ascending;
    this.orderWindowIsOpened=false;

    if (typeof this.products[0][property]==='string' || this.products[0][property] instanceof String) {
      if (ascending) {
        this.products = this.products.sort((a,b)=>{
          if (a[property]>b[property]) {
            return 1;
          } else if (a[property]<b[property]){
            return -1;
          }
          return 0;
        });
      } else {
        this.products = this.products.sort((a,b)=>{
          if (a[property]<b[property]) {
            return 1;
          } else if (a[property]>b[property]){
            return -1;
          }
          return 0;
        });
      }
    } else {
      this.products = this.products.sort((a,b)=>{
        if (ascending) {
          return a[property]-b[property];
        } else {
          return b[property]-a[property];
        }
      })
    }

    return this.products;
  }

  onSubmit(form: NgForm){
    this.filterWindowIsOpened=false;

    let selectedFilters={
      ...(this.filters.category && {category:this.filters.category}),
      ...(this.filters.subcategory && {subcategory:this.filters.subcategory}),
      price : new URLSearchParams(this.filters.price).toString()
    };

    Object.keys(this.filters).forEach(filterName=>{
      if (this.filters[filterName] && this.filters[filterName].constructor === Array) {
        this.filters[filterName].forEach(v=>{
          if (v.isChecked) {
            if (selectedFilters[filterName] && (selectedFilters[filterName].constructor === Array)) {
              selectedFilters[filterName].push(v.value);
            } else {
              selectedFilters[filterName]=[v.value];
            }
          }
        })
      }
    });

    this.productService.fetchProducts(selectedFilters).subscribe(
      (products: Product[])=>{
        this.products=products;
        this.productsReceived=true;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

}
