import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EUniApproveProcess } from '@ksp/shared/constant';
import _ from 'lodash';
type INPUT_TYPE =
  | 'consider'
  | 'examine'
  | 'consider_status'
  | 'examine_status'
  | 'certification_status';
@Component({
  selector: 'ksp-degree-cert-status',
  standalone: true,
  templateUrl: './degree-cert-status.component.html',
  styleUrls: ['./degree-cert-status.component.scss'],
  imports: [CommonModule],
})
export class DegreeCertStatusComponent implements OnInit {
  @Input() type: INPUT_TYPE = 'consider';
  @Input() dataSource: any;
  process:any;
  constructor() {}

  ngOnInit(): void {
    this.getProcess()
  }
  getProcess(): any {
    const status = {
      consider: this.getConsider(),
      examine: this.getExamine(),
      consider_status: this.getConsiderStatus(),
      examine_status: this.getExamineStatus(),
      certification_status: this.getCertificationStatus(),
    };
    this.process = status[this.type];
  }
  getConsider() {
    // if (['1', '2', '3'].includes(this.dataSource?.process)) return '';
    let classStatus = 'verify-status';
    const dprocess = _.toNumber(this.dataSource?.process);
    const dstatus = _.toNumber(this.dataSource?.status)
    let status: any = _.find(EUniApproveProcess, {
      requestType: _.toNumber(this.dataSource?.requestType),
      processId: _.toNumber(this.dataSource?.process),
    });
    status = _.find(status?.status, {
      id: _.toNumber(this.dataSource?.status),
    });
    if (!status) {
      classStatus = 'edit-status';
    }
    if ((dprocess == 1 && dstatus == 2) ||
        (dprocess == 3 && dstatus == 2) ||
        (dprocess == 4 && dstatus == 3) ||
        (dprocess == 5 && dstatus == 3)) {
      classStatus = 'return-status';
    }
    return {
      message: status?.sname,
      classStatus,
    };
  }
  getExamine() {
    let classStatus = 'verify-status';
    const dprocess = _.toNumber(this.dataSource?.process);
    const dstatus = _.toNumber(this.dataSource?.status)
    let status: any = _.find(EUniApproveProcess, {
      requestType: _.toNumber(this.dataSource?.requestType),
      processId: _.toNumber(this.dataSource?.process),
    });
    status = _.find(status?.status, {
      id: _.toNumber(this.dataSource?.status),
    });
    if (!status) {
      classStatus = 'edit-status';
    }
    if ((dprocess == 1 && dstatus == 2) ||
        (dprocess == 3 && dstatus == 2) ||
        (dprocess == 4 && dstatus == 3) ||
        (dprocess == 5 && dstatus == 3)) {
      classStatus = 'return-status';
    }
    return {
      message: status?.sname,
      classStatus,
    };
  }

  getConsiderStatus() {
    return (
      _.find(EUniApproveProcess, {
        processId: _.toNumber(this.dataSource?.process),
      })?.considerationName || ''
    );
  }

  getExamineStatus() {
    return (
      _.find(EUniApproveProcess, {
        processId: _.toNumber(this.dataSource?.process),
      })?.processName || ''
    );
  }
  getCertificationStatus() {
    if (this.dataSource?.process === '4') {
      return this.dataSource.status === '1'
        ? 'พิจารณารับรอง'
        : 'ไม่พิจารณารับรอง';
    }
    if (this.dataSource?.process === '5') {
      return this.dataSource?.status === '1'
        ? 'ผ่านการรับรอง/พิจารณา'
        : 'ไม่ผ่านการรับรอง/พิจารณา';
    }
    return '';
  }
}
