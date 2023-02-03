import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderService } from '@ksp/shared/service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-renew-license-create-group-list',
  templateUrl: './renew-license-create-group-list.component.html',
  styleUrls: ['./renew-license-create-group-list.component.scss'],
})
export class RenewLicenseCreateGroupListComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns = [
    'select',
    'order',
    'check',
    'summary',
    'account',
    'licenseNo',
    'idCardNo',
    'name',
    'licenseType',
    'affiliation',
    'province',
    'process',
    'status',
    'urgent',
    'checkDate',
    'updateDate',
    'requestDate',
    'license',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.dataSource.data = [
      {
        select: true,
        order: 1,
        check: true,
        summary: true,
        account: '7006',
        licenseNo: 'SF_TR640600004',
        idCardNo: '3-6406-00004-00-1',
        name: 'นายสมชาย สมบัติ',
        licenseType: 'ครู',
        affiliation: 'ผู้ประสงค์ประกอบวิชาชีพทางการศึกษา',
        province: 'กรุงเทพมหานคร',
        process: 'ตรวจสอบเอกสาร (2)',
        status: 'เสร็จสิ้น',
        urgent: true,
        checkDate: '01 มิ.ย. 2564',
        updateDate: '01 มิ.ย. 2564',
        requestDate: '01 มิ.ย. 2564',
        license: true,
      },
      {
        select: true,
        order: 2,
        check: true,
        summary: true,
        account: '7006',
        licenseNo: 'SF_TR640600004',
        idCardNo: '1-1020-XXXXX-XX-X',
        name: 'นางสาวจินดา รักไทรทอง',
        licenseType: 'ผู้บริหารสถานศึกษา',
        affiliation: 'สพมซ. เขต 1 กรุงเทพมหานคร',
        province: 'กรุงเทพมหานคร',
        process: 'ตรวจสอบเอกสาร (2)',
        status: 'เสร็จสิ้น',
        urgent: true,
        checkDate: '01 มิ.ย. 2564',
        updateDate: '01 มิ.ย. 2564',
        requestDate: '01 มิ.ย. 2564',
        license: true,
      },
    ];
  }

  next() {
    this.router.navigate(['/renew-license', 'create-group']);
  }

  prev() {
    this.router.navigate(['/renew-license', 'search-list']);
  }
}
