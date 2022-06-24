import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[kspSetGrayBg]',
  standalone: true,
})
export class SetGrayBackgroundDirective {
  constructor(el: ElementRef) {
    this.changeColor(el);
  }

  changeColor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#f9f9fa';
  }
}
