import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BringaBolt';
}

/*var cart:any=[];

function getParam(param:string) {
  return new URLSearchParams(window.location.search).get(param);
}

function getParam2(param:string){
  if (window.location.search) {
    let params={};

    paramArray = window.location.search.substring(1).split('&');
    for(i=0;i<paramArray.length;i++){
      let currentParam = paramArray[i].split('=');
      params[currentParam[0]]=currentParam[1];
    }
    return params;
  }

  return false;
}

function loadCart(){
  if (localStorage.getItem("cart")) cart = JSON.parse(localStorage.getItem("cart"));
  document.getElementById("item-count").innerHTML=cart.length?` (${cart.length})`:"";
  console.log(cart);
}

window.onload = function(){
  loadCart();
}*/
