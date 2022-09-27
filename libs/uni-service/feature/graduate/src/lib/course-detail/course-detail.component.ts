import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import { UniRequestService } from '@ksp/shared/service';
import { parseJson, thaiDate } from '@ksp/shared/utility';

@Component({
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  processType!: UniserviceImportType;
  importType = UniserviceImportType;
  requestDate = thaiDate(new Date());
  courseData: any = {};
  constructor(
    private router: Router, private route: ActivatedRoute,
    private uniRequestService: UniRequestService
  ) {}

  planRows = [1, 2, 3, 4];

  headerDetail = [
    '',
    'ขอยื่นรายชื่อผู้เข้าศึกษา',
    'ขอยื่นรายชื่อผู้สำเร็จการศึกษา',
  ];

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      //console.log('process type = ', this.processType);
    });
    this.uniRequestService.getUniRequestDegreeCertById('45').subscribe(response=>{
      if (response) {
        this.courseData = response;
        this.courseData.attachfiles = parseJson(response?.attachfiles);
        this.courseData.coordinatorinfo = parseJson(response?.coordinatorinfo);
        this.courseData.courseadvisor = parseJson(response?.courseadvisor);
        this.courseData.courseinstructor = parseJson(response?.courseinstructor);
        this.courseData.courseplan = parseJson(response?.courseplan);
        this.courseData.coursestructure = parseJson(response?.coursestructure);
        this.courseData.courseteacher = parseJson(response?.courseteacher);
        this.courseData.processteaching = parseJson(response?.processteaching);
        this.courseData.processtrainning = parseJson(response?.processtrainning);
        this.courseData.responsibleunit = parseJson(response?.responsibleunit);
        this.courseData.teachinglocation = parseJson(response?.teachinglocation);
        console.log(this.courseData);
      }
    })
  }

  goToImportStudent(type: number) {
    this.router.navigate(['/', 'student-list', 'import-student', type]);
  }

  cancel() {
    this.router.navigate(['/', 'student-list']);
  }
}
