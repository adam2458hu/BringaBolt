import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product:any;

  constructor(private http:HttpClient) { }

  fetchProducts(filter:any){
    return this.http.get('http://localhost:3000/api/products/getProductsByCategory',{params:filter});
  }

  fetchProductBySlug(slug:string){
    return this.http.get(`http://localhost:3000/api/products/getProductBySlug/${slug}`);
  }

  fetchProductById(id:string){
    return this.http.get(`http://localhost:3000/api/products/getProductById/${id}`);
    /*let colors=[];
        Object.keys(product.availableModels).forEach(color=>colors.push(color));
        colors.forEach(c=>{
          let colorCircle = document.createElement("div");
          colorCircle.classList.add("circle","color");
          colorCircle.style.backgroundColor=c;
          colorCircle.addEventListener("click",function(){selectColor(c)},false);
          document.getElementById("colors").appendChild(colorCircle);
        })

        selectColor(colors[0]);*/
  }

  /*function selectColor(color){
    [...document.getElementsByClassName("circle color")].forEach(colorCircle=>{
      if (colorCircle.classList.contains("active")) {
        colorCircle.className="circle color"; }
      else if (colorCircle.style.backgroundColor==color) {
        colorCircle.classList.add("active");
        product.selectedColor=color;
      }
    });

    document.getElementById("sizes").innerHTML="";
    product.selectedSize=undefined;
    let sizes=[];
    Object.keys(product.availableModels[color]).forEach(size=>sizes.push(size));
    sizes.forEach(s=>{
      let sizeContainer = document.createElement("div");
      sizeContainer.classList.add("circle","size-container");
      sizeContainer.addEventListener("click",function(){selectSize(s)},false);
      let size = document.createElement("div");
      size.classList.add("size",product.availableModels[color][s]==0?"sold-out":"a");
      size.innerHTML = s;
      sizeContainer.appendChild(size);
      document.getElementById("sizes").appendChild(sizeContainer);

      if (!product.selectedSize && product.availableModels[product.selectedColor][s]) {
        selectSize(s);
      }
    })

    if (!product.selectedSize) {
      selectSize(sizes[0]);
    }
  }

  function selectSize(size){
    [...document.getElementsByClassName("circle size-container")].forEach(sizeCircle=>{
      if (sizeCircle.classList.contains("active")) {
        sizeCircle.className="circle size-container";
      } else if (sizeCircle.getElementsByClassName("size")[0].innerHTML==size){
        sizeCircle.classList.add("active");
      }
    })

    product.selectedSize=size;
    let stockQuantity=product.availableModels[product.selectedColor][product.selectedSize];
    document.getElementById("order-quantity").value=1;
    // document.getElementById("order-quantity").setAttribute("max",stockQuantity);
    if (stockQuantity==0){
      document.getElementById("add-to-cart-button").innerHTML = "Előrendelés";
      document.getElementById("availability").innerHTML = "Nincs raktáron";
      document.getElementById("availability").className="";
    } else {
      document.getElementById("add-to-cart-button").innerHTML = "Kosárba";
      document.getElementById("availability").innerHTML = `Raktáron ${stockQuantity} db`;
      document.getElementById("availability").className="available";
    }
  }

  function addToCart(){
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    document.getElementById("item-count").innerHTML=cart.length?` (${cart.length})`:"";
    console.log(cart);
  }*/
}
