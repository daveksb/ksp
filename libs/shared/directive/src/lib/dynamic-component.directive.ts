import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[kspDynamicComponent]',
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
