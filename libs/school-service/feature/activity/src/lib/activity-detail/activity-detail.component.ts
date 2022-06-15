import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ActivityAcademicArchivementComponent,
  ActivityAddDegreeComponent,
  ActivityDiplomaReceiveComponent,
  ActivityInnovationComponent,
  ActivityLearningMaterialComponent,
  ActivityLecturerComponent,
  ActivityLectureRegisterComponent,
  ActivityResearchComponent,
  ActivityRewardComponent,
  ActivitySeminarComponent,
  ActivityStudyTourComponent,
  ActivityWriteBookComponent,
} from '@ksp/school-service/form/activity';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { DynamicComponent, ListData } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {
  activityForm = this.fb.group({
    activityType: [''],
  });

  activityTypes: ListData[] = [];
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  constructor(private router: Router, private fb: FormBuilder) {}
  addActivity = ['1.สำเนาผลการปฏิบัติงานตามมาตรฐานการปฏิบัติงาน'];

  ngOnInit(): void {
    this.activityTypes = activityTypes;

    this.activityForm.controls['activityType'].valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });
  }

  loadComponent(index: number) {
    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicComponent>(componentList[index]);
  }

  next() {
    this.router.navigate(['./', 'activity', 'education-level']);
  }
}

const componentList = [
  ActivityAddDegreeComponent,
  ActivityDiplomaReceiveComponent,
  ActivitySeminarComponent,
  ActivityAcademicArchivementComponent,
  ActivityLecturerComponent,
  ActivityWriteBookComponent,
  ActivityInnovationComponent,
  ActivityResearchComponent,
  ActivityRewardComponent,
  ActivityLectureRegisterComponent,
  ActivityStudyTourComponent,
  ActivityLearningMaterialComponent
];

const activityTypes = [
  {
    value: 0,
    label: `มีวุฒิเพิ่มขึ้นในสาขาที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา`,
  },
  {
    value: 1,
    label: `เข้ารับการอบรมและได้รับวุฒิบัตรแสดงความชำนาญการในการประกอบวิชาชีพจากคุรุสภา`,
  },
  {
    value: 2,
    label: `ผ่านการอบรมหลักสูตรที่เกี่ยวข้องกับการปฏิบัติงานในหน้าที่`,
  },
  {
    value: 3,
    label: `ได้เลื่อนวิทยฐานะ หรืออยู่ระหว่างการพิจารณาประเมินให้มีหรือเลื่อนวิทยฐานะ`,
  },
  {
    value: 4,
    label: `เป็นวิทยากรที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
  {
    value: 5,
    label: `เขียนตำรา หรือบทความ หรือผลงานทางวิชาการที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
  {
    value: 6,
    label: `สร้างนวัตกรรมที่ใช้ในการจัดการเรียนรู้หรือที่เป็นประโยชน์ต่อการศึกษา`,
  },
  {
    value: 7,
    label: `ทำวิจัยที่เป็นประโยชน์ต่อการจัดการเรียนรู้และการจัดการศึกษา `,
  },
  {
    value: 8,
    label: `ได้รับรางวัลจากคุรุสภาหรือของหน่วยงานทางการศึกษาอื่น`,
  },
  {
    value: 9,
    label: `เข้าฟังการบรรยาย อภิปราย ประชุมปฏิบัติการ ประชุมสัมมนา หรืออื่นๆ โดยมีการลงทะเบียนและมีหลักฐาน
    แสดงการเข้าร่วมกิจกรรมดังกล่าว`,
  },
  {
    value: 10,
    label: `ศึกษาดูงานที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา`,
  },
  {
    value: 11,
    label: `จัดทำผลงานหรือกิจกรรมที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา`,
  },
];
