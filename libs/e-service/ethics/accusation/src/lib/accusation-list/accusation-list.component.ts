import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type Mode = 'accusation' | 'investigation' | 'inquiry' | 'publish';

@Component({
  selector: 'e-service-ethic-accusation-list',
  templateUrl: './accusation-list.component.html',
  styleUrls: ['./accusation-list.component.scss'],
})
export class AccusationListComponent implements OnInit {
  mode: Mode = 'accusation';

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route?.parent?.url.subscribe((urlPath) => {
      this.mode = urlPath[urlPath.length - 1].path as Mode;
    });
  }

  next() {
    if (this.mode === 'accusation')
      this.router.navigate(['/', 'ethics', 'accusation', 'detail']);

    if (this.mode === 'investigation')
      this.router.navigate(['/', 'ethics', 'investigation', 'detail']);

    if (this.mode === 'inquiry')
      this.router.navigate(['/', 'ethics', 'inquiry', 'detail']);

    if (this.mode === 'publish')
      this.router.navigate(['/', 'ethics', 'publish', 'detail']);
  }
}
