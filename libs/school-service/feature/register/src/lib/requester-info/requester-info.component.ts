import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './requester-info.component.html',
  styleUrls: ['./requester-info.component.scss'],
})
export class RequesterInfoComponent implements OnInit {
  form: FormGroup;

  grant = {
    ['ยื่นแบบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต']: false,
    ['ยื่นแบบคำขอหนังสือรับรองคุณวุฒิ']: false,
    ['ยื่นแบบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School OneInnovation : OSOI)']:
      false,
    ['ทะเบียนหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต']: false,
    ['ทะเบียนข้อมูลครูและผู้บริหารศึกษา']: false,
  };

  constructor(private fb: FormBuilder, public router: Router) {
    this.form = this.fb.group(this.grant);
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //console.log('res = ', res);
    });
  }

  next() {
    this.router.navigate(['/', 'register', 'coordinator-info']);
  }
}
