import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KspParam, MenuConfig } from '@ksp/shared/interface';
import { deleteCookie } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
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

  logout() {
    deleteCookie('userToken');
    deleteCookie('iframeToken');
    this.router.navigate(['/']);
  }
}
