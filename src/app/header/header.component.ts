import { Component, OnInit } from '@angular/core';
import { faSignInAlt,faShoppingCart,faCaretDown,faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faShoppingCart = faShoppingCart;
  faCaretDown = faCaretDown;
  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
