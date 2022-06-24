import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[kspSetWhiteBg]',
  standalone: true,
})
export class SetWhiteBackgroundDirective {
  _kspSetWhiteBg = false;

  @Input()
  set kspSetWhiteBg(value: boolean) {
    this._kspSetWhiteBg = value;
    this.changeColor(this.el);
  }

  get kspSetWhiteBg(): boolean {
    return this._kspSetWhiteBg;
  }

  constructor(private el: ElementRef) {}

  changeColor(el: ElementRef) {
    if (this._kspSetWhiteBg) el.nativeElement.style.backgroundColor = '#ffffff';
  }
}
