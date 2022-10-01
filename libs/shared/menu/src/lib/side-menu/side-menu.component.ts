import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { KspParam, MenuConfig } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() menuConfig: MenuConfig[] = [];
  @Input() showHeader = false;
  @Input() name = '';
  @Input() lastLogin = '';

  constructor(private router: Router) {}

  navigateUrl(url: string, queryParams: KspParam | undefined) {
    if (queryParams) {
      this.router.navigate([url], {
        queryParams,
      });
    } else {
      this.router.navigate([url]);
    }
  }
}
