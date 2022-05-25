import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuConfig } from '@ksp/shared/ui/side-menu';

@Component({
  selector: 'ksp-e-service-container-page',
  templateUrl: './e-service-container-page.component.html',
  styleUrls: ['./e-service-container-page.component.css'],
})
export class EServiceContainerPageComponent implements OnInit {
  menuConfig: MenuConfig[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      //console.log('data = ', data);
      this.menuConfig = data['menuConfig'];
    });
  }
}
