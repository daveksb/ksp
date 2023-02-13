import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputThai]',
  standalone: true,

})
export class InputThaiDirective {
  regexStr = '/[^a-zA-Z]/g';

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initValue?.replace(/[^a-zA-Z]/g, '');
    if ( initValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

