import { BehaviorSubject } from 'rxjs';

export class ProductImageViewer {
  opened: boolean;
  mode: string;
  product: any;
  productImages: string[];
  selectedColor: string;
  currentIndex: number;
  previousMouseX: number;
  mouseDown: boolean;
  animationInterval: number;
  change: BehaviorSubject<any>;

  constructor() {
    this.opened=false;
    this.mode="default";//static?
    this.animationInterval=null;
    this.mouseDown=false;
    this.currentIndex=0;
    this.change = new BehaviorSubject<any>(this);
  }

  setmode(mode: string){
    this.mode = mode;
    this.change.next(this);
  }

  moveSlide(indexChange: number) {
    this.currentIndex += indexChange;
    if (this.currentIndex<0) {
      this.currentIndex = this.product.images[this.mode][this.product.selectedColor].length-1;
    } else if (this.currentIndex>=this.product.images[this.mode][this.product.selectedColor].length) {
      this.currentIndex = 0;
    }
    this.change.next(this);
  }

  handleMouseDown(event) {
    this.mouseDown = true;
    this.previousMouseX=event.offsetX;
    this.change.next(this);
  }

  handleMouseMove(event){
    if (this.mouseDown) {
          if (event.offsetX-this.previousMouseX>20) {
            this.moveSlide(-1);
            this.previousMouseX=event.offsetX;
          } else if (this.previousMouseX-event.offsetX>20) {
            this.moveSlide(1);
            this.previousMouseX=event.offsetX;
          }
          this.change.next(this);
        }
    }

  handleMouseUp(){
    this.mouseDown = false;
    this.change.next(this);
  }

  open(product,mode){
    this.product = product;
    this.currentIndex=0;
    this.mode=mode;
    this.opened = true;
    this.change.next(this);
  }

  close(){
    this.opened = false;
    this.change.next(this);
  }

  playAnimation(){
    if (this.animationInterval) this.stopAnimation();
    this.animationInterval = setInterval(()=>{
      this.moveSlide(1);
    },150);
  }

  stopAnimation(){
    clearInterval(this.animationInterval);
  }
};