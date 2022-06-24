import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[kspSetGrayBg]',
  standalone: true,
})
export class SetGrayBackgroundDirective {
  _kspSetGrayBg = false;

  @Input()
  set kspSetGrayBg(value: boolean) {
    this._kspSetGrayBg = value;
    this.changeColor(this.el);
  }

  get kspSetGrayBg(): boolean {
    return this._kspSetGrayBg;
  }

  constructor(private el: ElementRef) {}

  changeColor(el: ElementRef) {
    if (this._kspSetGrayBg) el.nativeElement.style.backgroundColor = '#f9f9fa';
  }
}
