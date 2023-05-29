import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { KspParam, MenuConfig } from '@ksp/shared/interface';
import { deleteCookie, getCookie } from '@ksp/shared/utility';

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
  isIframe = false;

  constructor(private router: Router) {
    const iframeToken = getCookie('iframeToken');
    if (iframeToken == 'TRUE') {
      this.isIframe = true;
    }
  }

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
