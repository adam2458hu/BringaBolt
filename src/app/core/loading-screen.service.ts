import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private loading: boolean = false;
  
  constructor() { }

  setLoading(value: boolean){
    this.loading = value;
  }

  isLoading(){
    return this.isLoading;
  }
}
