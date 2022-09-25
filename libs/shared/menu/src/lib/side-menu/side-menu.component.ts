import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuConfig } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  @Input() menuConfig: MenuConfig[] = [];
  @Input() showHeader = false;

  constructor(private router: Router) {}

  navigateUrl(url: string, queryParams: string) {
    if (queryParams) {
      console.log('url w param= ', url);
      this.router.navigate([url], {
        queryParams: { type: queryParams },
      });
    } else {
      console.log('url = ', url);
      this.router.navigate([url]);
    }
  }
}
