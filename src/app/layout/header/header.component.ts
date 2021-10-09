import { Component, OnInit,HostListener,ViewChild,ElementRef } from '@angular/core';
import { faSignInAlt,faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faCaretDown = faCaretDown;

  constructor() { }

  ngOnInit(): void {
  }

}
