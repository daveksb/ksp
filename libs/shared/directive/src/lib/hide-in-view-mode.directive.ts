import {
  Directive,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Directive({
  selector: '[hideInViewMode]',
  standalone: true,
})
export class HideInViewModeDirective implements OnChanges {
  //@Input() hideInViewMode = false;

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private host: KspFormBaseComponent
  ) {}

  ngOnChanges(): void {
    console.log('mode = ', this.host.mode);
    if (this.host.mode === 'view') {
      this.view.clear();
    } else {
      this.view.createEmbeddedView(this.template);
    }
  }
}
