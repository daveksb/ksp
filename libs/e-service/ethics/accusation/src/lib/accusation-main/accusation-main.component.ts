import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ethics } from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
import {
  jsonParse,
  mapFileInfo,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
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
  accusation!: AccusationRecordComponent;
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
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res) => {
          this.accusation.accusationFiles.forEach(
            (element: any, index: any) => {
              if (res.accusationfile) {
                const json: any = jsonParse(res?.accusationfile);
                if (json) {
                  element.fileid = json[index]?.fileid;
                  element.filename = json[index]?.filename;
                }
              }
            }
          );
          if (res?.investigationresult) {
            const json = jsonParse(res?.investigationresult);
            res.investigationresult = json;
          }
          this.form.controls.accusation.patchValue(res);
        });
      }
    });
  }

  saveEthics() {
    const ethics = new Ethics();
    const allowKey = Object.keys(ethics);
    const data = this.form.controls.accusation.value as any;

    if (data?.accuserinfo) {
      data.accuserinfo = JSON.stringify(data?.accuserinfo);
    }
    data.accusationfile = JSON.stringify(
      mapFileInfo(this.accusation.accusationFiles)
    );
    const selectData = _.pick(data, allowKey);
    if (this.ethicsId) {
      selectData['id'] = this.ethicsId;
      const payload = replaceEmptyWithNull(selectData);
      this.service.updateEthicsAccusation(payload).subscribe((res) => {
        console.log('save = ', res);
      });
    } else {
      this.service.createEthics(selectData).subscribe((res) => {
        const id = res.id;
        if (id) {
          this.router.navigate(['/accusation', 'detail', id]);
        }
      });
    }
  }

  next() {
    this.router.navigate(['/accusation', 'decision', this.ethicsId || '']);
  }

  cancel() {
    this.router.navigate(['/accusation']);
  }
}
