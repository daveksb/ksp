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
  @Input() name = '';
  @Input() lastLogin = '';

  constructor(private router: Router) {}

  /* ngOnInit(): void {
    this.myInfoService.getMyInfo().subscribe((res) => {
      this.name = res.firstnameth + ' ' + res.lastnameth;
      this.date = thaiDate(new Date(res.lastlogintime as string));
    });
  } */

  navigateUrl(url: string, queryParams: any) {
    if (queryParams) {
      this.router.navigate([url], {
        queryParams,
      });
    } else {
      this.router.navigate([url]);
    }
  }
}
