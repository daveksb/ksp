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

  /**
   * Side menu use absolute path routing
   */

  constructor(private router: Router) {}

  goThirdLevelMenu(url: string, queryParams: string) {
    this.router.navigate([url], {
      queryParams: { subtype: queryParams },
    });
  }
}
