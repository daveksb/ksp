import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
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
  ActivityLearningMaterialComponent,
} from '@ksp/school-service/form/activity';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  SelfActivityAcademicWorkComponent,
  SelfActivityArticleWritingComponent,
  SelfActivityAssessmentComponent,
  SelfActivityBookWritingComponent,
  SelfActivityMediaCreateComponent,
  SelfActivityMenterComponent,
  SelfActivityMoreComponent,
  SelfActivitySelfLearningComponent,
} from '@ksp/shared/form/self-activity-form';
import { DynamicComponent, ListData } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-self-improve-activity-detail',
  templateUrl: './self-improve-activity-detail.component.html',
  styleUrls: ['./self-improve-activity-detail.component.scss'],
})
export class SelfImproveActivityDetailComponent implements OnInit {
  activityForm = this.fb.group({
    activityType: [null],
  });

  activityTypes: ListData[] = [];
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  evidenceFiles = [
    {
      name: '1.วุฒิบัตร',
      fileId: '',
    },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activityTypes = activityTypes;

    this.activityType.valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });
  }

  get activityType() {
    return this.activityForm.controls.activityType;
  }

  loadComponent(index: number) {
    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicComponent>(componentList[index]);
  }
}

const componentList = [
  ActivityAddDegreeComponent,
  ActivitySeminarComponent,
  ActivitySeminarComponent,
  SelfActivitySelfLearningComponent,
  ActivityStudyTourComponent,
  ActivityResearchComponent,
  SelfActivityMediaCreateComponent,
  ActivityStudyTourComponent,
  SelfActivityArticleWritingComponent,
  SelfActivityBookWritingComponent,
  SelfActivityAcademicWorkComponent,
  ActivityLecturerComponent,
  SelfActivityMenterComponent,
  SelfActivityAssessmentComponent,
  ActivityRewardComponent,
  SelfActivityMoreComponent,
];

const activityTypes = [
  {
    value: 0,
    label: `การศึกษาให้มีวุฒิเพิ่มขึ้นในสาขาเกี่ยวข้องกับการประกอบวิชาชีพทางการศึกษา ทั้งในระดับปริญญา และระดับบัณฑิตศึกษา`,
  },
  {
    value: 1,
    label: `การเข้าฟังการบรรยาย การอภิปราย การประชุมวิชาการ การประชุมปฏิบัติการ การประชุมสัมมนา หรือการประชุมในรูปแบบอื่นๆที่คุรุใสภาให้การรับรอง`,
  },
  {
    value: 2,
    label: `การฝึกอบรมในหลักสูตรที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้าน`,
  },
  {
    value: 3,
    label: `การเรียนรู้ด้วยตนเองในเรื่องที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้าน จากบทความทางวิชาชีพ หรือวิชาการเฉพาะด้าน หรือการเรียนรู้ผ่านเทคโนโลยีสารสนเทศ เช่นบทความวิชาการ`,
  },
  {
    value: 4,
    label: `การศึกษาดูงานที่เกี่ยวข้องกับวิชาชีพทางการศึกษา ทั้งในประเทศ หรือต่างประเทศ`,
  },
  {
    value: 5,
    label: `การทำวิจัยในเรื่องที่เป็นประโยชน์ต่อการจัดการเรียนรู้และการจัดการศึกษา `,
  },
  {
    value: 6,
    label: `การสร้างสื่อการศึกษา พร้อมแบบทดสอบเพื่อการศึกษาหรือเรียนรู้ด้วยตนเอง ทั้งในรูปแบบเอกสาร และสื่ออิเล็กทรอนิกส์ เช่ย บทความ online , e-learning , E-book เป็นต้น`,
  },
  {
    value: 7,
    label: `การเข้าร่วมกิจกรรมพัฒนาวิชาชีพ แบบชุมชนแห่งการเรียนรู้`,
  },
  {
    value: 8,
    label: `การเขียนบทความทางวิชาชีพ และได้รับการตีพิมพ์เผยแพร่ต่อสาธารณชน เช่น วารสารวิทยาจารย์ เป็นต้น`,
  },
  {
    value: 9,
    label: `การแต่งตำรา หรือหนังสือ ในเรื่องที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้านที่เกี่ยวข้องกับวิชาชีพ`,
  },
  {
    value: 10,
    label: `การสร้างผลงานทางวิชาการ เช่น ผลงานวิจัย ผลงานนวัตกรรมที่ใช้ในการเรียนรู้ หรือ ที่เป็นประโยชน์ต่อการศึกษา`,
  },
  {
    value: 11,
    label: `การเป็นวิทยากร ผู้บรรยาย ผู้อภิปราย หรือผู้อภิปรายร่วมในกิจกรรมที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้าน`,
  },
  {
    value: 12,
    label: `การเป็นครูพี่เลี้ยง ผู้บริหารพี่เลี้ยง หรือผู้ควบคุมการฝึกปรัสบการณ์วิชาชีพทางการศึกษาสำหรับนักศึกษาในหลักสูตรประกาศนียบัตรบัณฑิต หรือปริญญาทางการศึกษา`,
  },
  {
    value: 13,
    label: `การผ่านการประเมิน เพื่อให้มีหรือเลื่อน วิทยฐานะที่สูงขึ้น หรือผ่านการรับรองความชำนาญในการประกอบวิชาชีพตามหลักเกณฑ์ที่คุรุสภากำหนด`,
  },
  {
    value: 14,
    label: `การปฏิบัติการสอนดีเด่นจนได้รับรางวัล การได้รับคัดเลือกให้ได้รางวัลของคุรุสภา หรือรางวัลที่เป็นประโยชน์ต่อการจัดการศึกษา`,
  },
  {
    value: 15,
    label: `กิจกรรมอื่นๆ ที่คณะกรรมการรับรอง`,
  },
];
