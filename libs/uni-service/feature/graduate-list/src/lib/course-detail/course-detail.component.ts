import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'uni-service-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  processType = 0;
  constructor(private router: Router, private route: ActivatedRoute) {}

  rows = [1, 2, 3, 4];

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      console.log('process type = ', this.processType);
    });
  }

  goToImportStudent(type: number) {
    this.router.navigate(['./', 'graduate-list', 'import-student', type]);
  }

  cancel() {
    this.router.navigate(['./', 'graduate-list']);
  }
}
