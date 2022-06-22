import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuConfig } from '@ksp/shared/menu';

@Component({
  selector: 'ksp-e-service-container-page',
  templateUrl: './e-service-container-page.component.html',
  styleUrls: ['./e-service-container-page.component.css'],
})
export class EServiceContainerPageComponent implements OnInit {
  menuConfig: MenuConfig[] = [];
  headerLabel = '';
  headerDetail = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.menuConfig = data['menuConfig'];
      this.headerLabel = data['headerLabel'];
      this.headerDetail = data['headerDetail'];
      //console.log('res3 = ', data);
    });
  }
}
