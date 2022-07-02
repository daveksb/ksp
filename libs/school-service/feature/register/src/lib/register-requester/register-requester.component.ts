import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './register-requester.component.html',
  styleUrls: ['./register-requester.component.scss'],
})
export class RegisterRequesterComponent implements OnInit {
  grant = grants;

  form = this.fb.group({
    grant1: [false],
    grant2: [false],
    grant3: [false],
    grant4: [false],
    grant5: [false],
    requester: [],
  });

  constructor(private fb: FormBuilder, public router: Router) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //console.log('res = ', res);
    });
  }

  next() {
    this.router.navigate(['/register', 'coordinator']);
  }
}

export const grants = [
  {
    label: 'ยื่นแบบคำขออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
    name: 'grant1',
    value: false,
  },
  { label: 'ยื่นแบบคำขอหนังสือรับรองคุณวุฒิ', name: 'grant2', value: false },
  {
    label:
      'ยื่นแบบคำขอรับรางวัลหนึ่งโรงเรียนหนึ่งนวัตกรรม (One School One Innovation : OSOI) ',
    name: 'grant3',
    value: false,
  },
  {
    label: 'ทะเบียนหนังสืออนุญาตให้ประกอบวิชาชีพ โดยไม่มีใบอนุญาต',
    name: 'grant4',
    value: false,
  },
  {
    label: 'ทะเบียนข้อมูลครูและผู้บริหารศึกษา',
    name: 'grant5',
    value: false,
  },
];
