import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[kspDynamicComponent]',
  standalone: true,
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
