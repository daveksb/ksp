import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputThai]',
  standalone: true,

})
export class InputThaiDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initValue?.replace(/[^ก-๏\s]/g, '');
    if ( initValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

