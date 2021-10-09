import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'BringaBolt';
  pageTitles={
    "bikes":"Kerékpárok",
    "parts":"Alkatrészek",
    "accessories":"Kiegészítők",
    "clothing":"Ruházat",
    "road":"Országúti kerékpárok",
    "mtb":"MTB kerékpárok",
    "kid":"Gyermek kerékpárok",
    "tires":"Külső gumik",
    "chains":"Láncok",
    "lamps":"Lámpák",
    "locks":"Lakatok",
    "pumps":"Pumpák",
    "bags":"Táskák",
    "transport":"Szállítás",
    "helmets":"Sisakok",
    "jerseys":"Mezek",
    "shorts":"Nadrágok"
  }
  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.router.events.pipe(
        filter(event=>event instanceof NavigationEnd),
        map(()=>{
          let child=this.route.firstChild;
          while(child){
            if (child.firstChild){
              child=child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data["title"]){
              return child.snapshot.data["title"];
            } else if (child.snapshot.paramMap.get("subcategory")){
              return child.snapshot.paramMap.get("subcategory");
            } else if (child.snapshot.paramMap.get("category")) {
              return child.snapshot.paramMap.get("category");
            } else {
              return null;
            }
          }
      })).subscribe(
      (data:any)=>{
        this.titleService.setTitle(this.pageTitles[data]);
      },
      (err)=>{
        console.log(err);
      });
  }
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
