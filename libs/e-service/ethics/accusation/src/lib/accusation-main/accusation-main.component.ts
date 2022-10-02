import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ethics } from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
import { UntilDestroy } from '@ngneat/until-destroy';
import localForage from 'localforage';
import _ from 'lodash';
import { AccusationRecordComponent } from '../accusation-record/accusation-record.component';
@UntilDestroy()
@Component({
  selector: 'e-service-accusation-main',
  templateUrl: './accusation-main.component.html',
  styleUrls: ['./accusation-main.component.scss'],
})
export class AccusationMainComponent implements OnInit {
  ethicsId!: number;

  form = this.fb.group({
    accusation: [] as any,
  });
  @ViewChild(AccusationRecordComponent)
  formComponents!: AccusationRecordComponent;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();

    this.form.valueChanges.subscribe((res) => {
      // console.log('form value = ', this.form.controls.accusation.value);
    });
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        localForage.getItem('ethicsInfo').then((data) => {
          // this.formComponents.addRow();
          this.form.controls.accusation.patchValue(data);
        });
      }
    });
  }

  saveEthics() {
    const ethics = new Ethics();
    const allowKey = Object.keys(ethics);
    const data = this.form.controls.accusation.value as any;
    if (data?.accusation) {
      data.accusationinfo = JSON.stringify(data?.accusationinfo);
    }
    const selectData = _.pick(data, allowKey);
    if (this.ethicsId) {
      selectData['id'] = this.ethicsId;
      this.service.updateEthicsAccusation(selectData).subscribe((res) => {
        console.log('save = ', res);
      });
    } else {
      this.service.createEthics(selectData).subscribe((res) => {
        console.log('save = ', res);
        const id = res.id;
        if (id) {
          this.router.navigate(['/accusation', 'detail', id]);
        }
      });
    }
  }

  next() {
    this.router.navigate(['/accusation', 'decision']);
  }

  cancel() {
    this.router.navigate(['/accusation']);
  }
}
