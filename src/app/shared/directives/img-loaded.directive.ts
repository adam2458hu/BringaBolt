import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'img',
})
export class ImgLoadedDirective {
  @Output() loaded = new EventEmitter();

  @HostListener('load')
  @HostListener('error')
  imageLoaded() {
    this.loaded.emit();
    this.loaded.complete();
  }
}