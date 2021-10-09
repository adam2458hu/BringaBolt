import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit, HostListener, ViewChild, ViewChildren,QueryList, ElementRef } from '@angular/core';
import { ProductImageViewerService } from '../../core/product-image-viewer.service';
import { ProductImageViewer } from '../shared/product-image-viewer';
import { environment } from '../../../environments/environment';
import { GetProductImagesPipe } from '../../shared/pipes/get-product-images.pipe';

@Component({
  selector: 'app-product-image-viewer',
  templateUrl: './product-image-viewer.component.html',
  styleUrls: ['./product-image-viewer.component.scss']
})
export class ProductImageViewerComponent implements OnInit {
  productImageViewer: ProductImageViewer;
  getProductImagesPipe = new GetProductImagesPipe();
  magnifierMultiplier: number;
  magnifierGlassRadius: number;
  unlistenMouseDown: ()=>void;
  unlistenMouseUp: ()=>void;
  unlistenMouseMove: ()=>void;
  unlistenWheel: ()=>void;
  @ViewChild('modal') modal:ElementRef;
  @ViewChildren('modalContent') modalContentQuery: QueryList<any>;
  @ViewChild('modalContent') modalContentRef: ElementRef;
  @ViewChild('productImageViewerDefault') productImageViewerDefault: ElementRef;
  @ViewChild('productImageViewer360') productImageViewer360: ElementRef;
  @ViewChild('productImage') productImage: ElementRef;
  @ViewChild('magnifierGlass') magnifierGlass: ElementRef;
  @HostListener('window:click',['$event'])
  onClick(event){
    if (this.modal && event.target==this.modal.nativeElement) {
      this.close();
    }
  }

  constructor(
    private renderer2: Renderer2,
    private productImageViewerService: ProductImageViewerService
  ) {}

  ngOnInit(): void {
    this.productImageViewerService.productImageViewer.change.subscribe(
      (productImageViewer)=>{
        this.productImageViewer = productImageViewer;
      });
  }

  ngAfterViewInit(): void {
    this.modalContentQuery.changes.subscribe(()=>{
      if (this.productImageViewerDefault) {
        this.initMagnifierGlass();
        
        this.unlistenMouseMove = this.renderer2.listen(this.productImageViewerDefault.nativeElement,'mousemove',event=>{
          var rect = event.currentTarget.getBoundingClientRect(),
          offsetX = event.clientX - rect.left,
          offsetY = event.clientY - rect.top;

          if (event.target==this.productImage.nativeElement 
            && getComputedStyle(this.magnifierGlass.nativeElement).getPropertyValue('display')=='none') {
              this.renderer2.setStyle(this.magnifierGlass.nativeElement,'display','block');
          } else if (event.target!=this.productImage.nativeElement 
            && getComputedStyle(this.magnifierGlass.nativeElement).getPropertyValue('display')=='block') {
              this.renderer2.setStyle(this.magnifierGlass.nativeElement,'display','none');
          }

          this.renderer2.setStyle(this.magnifierGlass.nativeElement,'top',offsetY+'px');
          this.renderer2.setStyle(this.magnifierGlass.nativeElement,'left',offsetX+'px');
          /*A háttérképet felfelé és/vagy balra toljuk attól függően, hogy az egér pozíciója hol van
          az esemény céljául szolgáló html elem bal felső pontjához képest.*/
          this.renderer2.setStyle(this.magnifierGlass.nativeElement,'background-position',((-event.offsetX*this.magnifierMultiplier)+this.magnifierGlassRadius)+'px '+((-event.offsetY*this.magnifierMultiplier)+this.magnifierGlassRadius)+'px');
        });
        this.unlistenWheel = this.renderer2.listen(this.productImageViewerDefault.nativeElement,'wheel',event=>{
          //az oldal görgetésének megakadályozása
          event.preventDefault();
          /*A nagyítás mértékének növelése vagy csökkentése a görgetés irányától függően.
          Az event.deltaY 100 vagy -100 lehet, ezért 0.01-el szorozzuk. Ezután annak vizsgálata,
          hogy a nagyítási szorzó nem e lépte túl a megengedett minimum vagy maximum értéket.*/
          this.magnifierMultiplier=Math.min(Math.max(1,this.magnifierMultiplier+event.deltaY*-0.01),5);
          //a háttérkép méretének és pozíciójának frissítése
          this.renderer2.setStyle(this.magnifierGlass.nativeElement,
          'background-size',(this.productImage.nativeElement.clientWidth*this.magnifierMultiplier)+'px '
            +this.productImage.nativeElement.clientHeight*this.magnifierMultiplier+'px');
          this.renderer2.setStyle(this.magnifierGlass.nativeElement,'background-position',((-event.offsetX*this.magnifierMultiplier)+this.magnifierGlassRadius)+'px '+((-event.offsetY*this.magnifierMultiplier)+this.magnifierGlassRadius)+'px');
        })
      } else if (this.productImageViewer360) {
        this.unlistenMouseDown = this.renderer2.listen(this.productImageViewer360.nativeElement,'mousedown',event=>{
          this.productImageViewerService.productImageViewer.handleMouseDown(event);
        });

        this.unlistenMouseMove = this.renderer2.listen(this.productImageViewer360.nativeElement,"mousemove",event=>{   
          this.productImageViewerService.productImageViewer.handleMouseMove(event);
        });

        this.unlistenMouseUp = this.renderer2.listen(this.productImageViewer360.nativeElement,'mouseup',event=>{
          this.productImageViewerService.productImageViewer.handleMouseUp();
        });
      }
      
    })
  }

  ngOnDestroy(): void {
   /* this.unlistenMouseDown();
    this.unlistenMouseUp();
    this.unlistenMouseMove();
    this.unlistenWheel();*/
  }

  moveSlide(valueOfChange){
    this.productImageViewerService.productImageViewer.moveSlide(valueOfChange);
  }

  playAnimation(){
    this.productImageViewerService.productImageViewer.playAnimation();
  }

  stopAnimation(){
    this.productImageViewerService.productImageViewer.stopAnimation();
  }

  close(){
    this.productImageViewerService.productImageViewer.close();
  }

  initMagnifierGlass(){
    //alapértelmezetten kétszeres a nagyítás mértéke
    this.magnifierMultiplier=2;
    this.magnifierGlassRadius=parseInt(getComputedStyle(this.magnifierGlass.nativeElement).getPropertyValue('width').replace('px',''))/2;
    //a nagyító háttérképe az adott áru képe, aminek mérete szorozva lesz a nagyítási szorzóval
    this.renderer2.setStyle(this.magnifierGlass.nativeElement,'background-image',`url(${this.getProductImagesPipe.transform(this.productImageViewer.product,this.productImageViewer.product.selectedColor,this.productImageViewer.currentIndex)})`);
    this.renderer2.setStyle(this.magnifierGlass.nativeElement,
      'background-size',(this.productImage.nativeElement.clientWidth*this.magnifierMultiplier)+'px '
        +this.productImage.nativeElement.clientHeight*this.magnifierMultiplier+'px');
  }
}
