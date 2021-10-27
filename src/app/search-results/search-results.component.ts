import { Component, OnInit, AfterViewInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../core/product.service';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements AfterViewInit {
  searchResults: any[]=[];
  faSearch = faSearch;
  faTimesCircle = faTimesCircle;
  @ViewChild('searchBox') searchBox: ElementRef;
  @ViewChild('searchBoxInput') searchBoxInput: ElementRef;
  @ViewChild('searchResultsRef') searchResultsRef: ElementRef;
  @HostListener('window:click',['$event'])
  onClick(event){
    if (document.activeElement==document.getElementById("search-box-input")
      && !document.getElementById("search-box").classList.contains("active")) {
      document.getElementById("search-box").classList.add("active");
    } else if (document.activeElement!=document.getElementById("search-box-input")){
      document.getElementById("search-box").classList.remove("active");
    }
  }

  constructor(
    private productService: ProductService
  ) { }

  ngAfterViewInit(): void {
  }

  search(){
    this.productService.fetchProducts({name: this.searchBoxInput.nativeElement.value}).subscribe(
      (res:any)=>{
        this.searchResults = res;
      },
      (err)=>{
        this.searchResults = [];
        console.log(err);
      }
    );
  }

  hasValue(){
    if ((<HTMLInputElement>document.getElementById("search-box-input")).value!='') {
      this.searchBox.nativeElement.classList.add("has-value");
    } else {
      this.searchBox.nativeElement.classList.remove("has-value");
    }
  }

  onFocusOut(event){
    if (document.getElementById("search-results") && document.getElementById("search-results").contains(event.relatedTarget)) {
      event.relatedTarget.click();
      (<HTMLInputElement>document.getElementById("search-box-input")).value=event.relatedTarget.children[0].innerHTML;
    }
  }

  resetSearchBoxInput(){
    (<HTMLInputElement>document.getElementById("search-box-input")).value='';
    this.searchBox.nativeElement.classList.remove("has-value");
  }

}
