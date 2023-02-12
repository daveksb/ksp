import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputNumber]',
  standalone: true,

})
export class InputNumberDirective {
  constructor(private el: ElementRef) { }
  @HostListener('input', ['$event']) onInput(event:any) {
    const initValue = this.el.nativeElement.value;

    this.el.nativeElement.value = initValue?.replace(/[^0-9]*/g, '');
    if ( initValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
