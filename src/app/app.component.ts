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
