import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Directive({
  selector: '[hideInViewMode]',
  standalone: true,
})
export class HideInViewModeDirective implements OnInit {
  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private host: KspFormBaseComponent
  ) {}

  ngOnInit(): void {
    if (this.host.mode === 'edit') {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }
}
