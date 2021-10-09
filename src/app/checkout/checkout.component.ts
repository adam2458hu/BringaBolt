import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from '../core/cart.service';
import { faCheck,faStore,faUniversity,faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  currentIndex: number=0;
  progressInterval: number=0;
  progressBarWidth: number;
  progressWidth: number;
  gradientEndPosition: number;
  faCheck = faCheck;
  faStore = faStore;
  faUniversity = faUniversity;
  faMoneyBillWave = faMoneyBillWave;
  isBillingAddressTheSame: boolean = true;
  deliveryAddress: any = {
    firstName:'',
    lastName:'',
    city:'',
    street:'',
    postalCode:'',
    email:'',
    phone:''
  };
  billingAddress: any = {
    firstName:'',
    lastName:'',
    city:'',
    street:'',
    postalCode:'',
    email:'',
    phone:''
  };
  shippingFee: number;
  totalValue: number;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('progress') progress: ElementRef;
  constructor(private renderer2: Renderer2,private cartService: CartService) { }

  ngOnInit(): void {
    this.totalValue = this.cartService.getTotalValue();
    this.shippingFee = this.cartService.getShippingFee();
    document.documentElement.style.setProperty('--progress-bar-current-offset',getComputedStyle(document.documentElement).getPropertyValue("--progress-bar-initial-offset"));  
  }

  ngAfterViewInit(): void {
    this.progressBarWidth=parseInt(getComputedStyle(this.progressBar.nativeElement).getPropertyValue('width'));
  }

  previousStep(){
    if (this.currentIndex-1>=0) {
      --this.currentIndex;
      this.animateProgressBar(false);
    }
    this.progressBar.nativeElement.getElementsByClassName("step-title")[0].scrollIntoView();
  }

  nextStep(){
    if (this.currentIndex+1<4) {
      ++this.currentIndex;
      this.animateProgressBar(true);
    }
  }

  animateProgressBar(forward: boolean){
    let currentProggressBarOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--progress-bar-current-offset").replace('%',''));
    let progressBarAnimationDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--progress-bar-animation-duration").replace('ms',''));
    this.renderer2.setStyle(this.progress.nativeElement,'animation','none');
    this.progress.nativeElement.offsetHeight;
    this.renderer2.setStyle(this.progress.nativeElement,'animation',null);
    
    if (forward) {
      this.progress.nativeElement.classList.remove('progress-animation');
      document.documentElement.style.setProperty('--progress-bar-target-offset',currentProggressBarOffset+33.3+'%');
      this.progress.nativeElement.classList.add('progress-animation');
      setTimeout(()=>{
        document.documentElement.style.setProperty('--progress-bar-current-offset',currentProggressBarOffset+33.3+'%')
        //this.progressBar.nativeElement.getElementsByClassName("step-title")[0].scrollIntoView();
      },progressBarAnimationDuration);
    } else {
      this.progress.nativeElement.classList.remove('progress-animation');
      document.documentElement.style.setProperty('--progress-bar-target-offset',currentProggressBarOffset-33.3+'%');
      this.progress.nativeElement.classList.add('progress-animation');
      setTimeout(()=>{
        document.documentElement.style.setProperty('--progress-bar-current-offset',currentProggressBarOffset-33.3+'%')
        //this.progressBar.nativeElement.getElementsByClassName("step-title")[0].scrollIntoView();
      },progressBarAnimationDuration);
    }
  }

  onSubmit(form: NgForm) {
    /*if (form.value.isBillingAddressTheSame) {
      this.billingAddress = this.deliveryAddress;
    }*/
    console.log(form.value);
  }
}
