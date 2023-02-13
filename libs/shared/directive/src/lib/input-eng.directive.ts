import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputEng]',
  standalone: true,

})
export class InputEngDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initValue?.replace(/[^a-zA-Z]/g, '');
    if ( initValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

