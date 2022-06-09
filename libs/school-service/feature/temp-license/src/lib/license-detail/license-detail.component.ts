import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';
import { ForbiddenPropertyComponent } from '@ksp/shared/ui/forbidden-property';

@Component({
  selector: 'school-service-license-detail',
  templateUrl: './license-detail.component.html',
  styleUrls: ['./license-detail.component.scss'],
})
export class LicenseDetailComponent implements OnInit {
  requestTypeLabel = '';
  selectedTabIndex = 0;

  educationInfo = [
    '1.สำเนาปริญญาบัตรหรือสำเนาหนังสือรับรอง',
    '2.สำเนาใบรายนงานผลการศึกษา',
    '3.สำเนาหลักฐานการเปลี่ยนชื่อฯ (ถ้ามี)',
    '4.สำเนาหนังสือรับรองการเทียบวุฒิฯ (ถ้ามี)',
    '5.สำเนาเอกสารคำแปลวุฒิ (ถ้ามี)',
  ];

  teachingInfo = [
    '1.ตารางสอนรายบุคคล',
    '2.สำเนาสัญญาจ้าง',
    '3.หน้งสือรับรองการจ้างต่อ (ถ้ามี)',
    '4.สำเนาคำสั่งให้ไปปฏิบัติหน้าที่สอนฯ (ถ้ามี)',
  ];

  reasonInfo = [
    '1.หนังสือบันทึกชี้แจงเหตุผลคว่มจำเป็น (ถ้ามี)',
    '2.หลักฐานการพัฒนาตนเอง',
  ];

  evidenceFiles = [
    'หนังสือนำส่งจากสถานศึกษา (ฉบับจริงและวันที่ออกหนังสือไม่เกิน 30 วัน)',
    'สำเนาหนังสือแต่งตั้ง ผอ. หรือ รอง ผอ.รักษาราชการแทนจากต้นสังกัด (กรณีรักษาการผู้อำนวยการ)',
    'หนังสือรับรองการจ้างต่อ (กรณีที่สัญญาจ้างปัจจุบันที่เหลือระยะเวลาการจ้างน้อยกว่า 30 วัน)',
    'สำเนาคำสั่งให้ไปปฏิบัติการสอนในสถานศึกษาจากต้นสังกัด หรือสำเนาหนังสือส่งตัวรับตัวจากต้นสังกัดถึงสถานศึกษา (กรณี จ้างโดย สพป./สพม./ต้นสังกัด)',
    'หนังสือบันทึกชี้แจงเหตุผลความจำเป็นของสถานศึกษาและปัญหาการพัฒนาตนเองไม่ทันตามกำหนดระยะเวลา(กรณีได้รับอนุญาตฯ ครบตามกำหนดระยะเวลา)',
    'รูปถ่าย 1 นิ้ว',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateHeaderLabel();
  }

  onTabIndexChanged(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  updateHeaderLabel() {
    this.route.queryParams.subscribe((params) => {
      if (params['type'] == 1) {
        this.requestTypeLabel = '(ชาวไทย)';
      } else if (params['type'] == 2) {
        this.requestTypeLabel = '(ผู้บริหารการศึกษา)';
      } else if (params['type'] == 3) {
        this.requestTypeLabel = '(ชาวต่างชาติ)';
      }
    });
  }

  back() {
    this.router.navigate(['/', 'temp-license', 'list']);
  }

  cancel() {
    this.router.navigate(['/', 'temp-license']);
  }

  save() {
    const dialogRef = this.dialog.open(ForbiddenPropertyComponent, {
      height: '475px',
      width: '850px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '250px',
      width: '350px',
      data: {
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'temp-license', 'list']);
      }
    });
  }
}
