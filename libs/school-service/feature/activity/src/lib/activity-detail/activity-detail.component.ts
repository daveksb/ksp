import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {
  activityFormGroup: FormGroup;

  activity = {
    ['วุฒิเพิ่มขึ้นในสาขาที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา']: false,
    ['เข้ารับการอบรมและได้รับวุฒิบัตรแสดงความชำนาญในการประกอบวิชาชีพจากคุรุสภา']:
      false,
    ['ผ่านการอบรมหลักสูตรที่เกี่ยวข้องกับการปฎิบัติงานในหน้าที่']: false,
    ['เลื่อนวิทยฐานะ ']: false,
    ['วิทยากรที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา']: false,
    ['เขียนตำรา หรือบทความ หรือผลงานทางวิชาการที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา']:
      false,
    ['สร้างนวัตกรรมที่ใช้ในการจัดการเรียนรู้หรือที่เป็นประโยชน์ต่อการศึกษา']:
      false,
    ['ทำวิจัยที่เป็นประโยชน์ต่อการจัดการเรียนรู้และการจัดการศึกษา']: false,
    ['รับรางวัลจากคุรุสภาหรือของหน่วยงานทางการศึกษาอื่น']: false,
    ['เข้าฟังการบรรยาย อภิปราย ประชุมปฏิบัติการ ประชุมสัมมนา หรืออื่น ๆ โดยมีการลงทะเบียนและมีหลักฐานแสดงการเข้าร่วมกิจกรรมดังกล่าว']:
      false,
    ['ศึกษาดูงานที่เกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา']: false,
    ['จัดทำผลงานหรือกิจกรรมที่เป็นประโยชน์ต่อการจัดการเรียนรู้หรือการจัดการศึกษา']:
      false,
  };

  constructor(private router: Router, private fb: FormBuilder) {
    this.activityFormGroup = this.fb.group(this.activity);
  }

  ngOnInit(): void {
    this.activityFormGroup.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    });
  }

  next() {
    this.router.navigate(['./', 'activity', 'education-level']);
  }
}
