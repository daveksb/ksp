import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputEng]',
  standalone: true,

})
export class InputEngDirective {
  regexStr = '^[a-zA-Z\s]+$';

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initValue?.replace(/[^A-Za-z0-9]/g, '');
    if ( initValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

