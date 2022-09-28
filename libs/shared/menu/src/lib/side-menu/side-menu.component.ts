import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuConfig } from '@ksp/shared/interface';
import { MyInfoService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  @Input() menuConfig: MenuConfig[] = [];
  @Input() showHeader = false;
  date!: string;
  name!: string;
  constructor(private router: Router, private myInfoService: MyInfoService) {}
  ngOnInit(): void {
    this.myInfoService.getMyInfo().subscribe((res) => {
      this.name = res.firstnameth + ' ' + res.lastnameth;
      this.date = thaiDate(new Date(res.lastlogintime as string));
    });
  }
  navigateUrl(url: string, queryParams: string) {
    if (queryParams) {
      this.router.navigate([url], {
        queryParams: { type: queryParams },
      });
    } else {
      this.router.navigate([url]);
    }
  }
}
