import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faEnvelope = faEnvelope;
  @ViewChild('newsletterBlock') newsletterBlock: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  shrinkNewsletterBlock(shrink: boolean){
    if (shrink) {
      this.newsletterBlock.nativeElement.classList.add("shrink");
    } else {
      this.newsletterBlock.nativeElement.classList.remove("shrink");
    }
  }

}
