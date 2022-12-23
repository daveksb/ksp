import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { staffLicenseTypes } from '@ksp/shared/constant';
import { ListData, PositionType, SchStaff } from '@ksp/shared/interface';
import { LoaderService, StaffService } from '@ksp/shared/service';
import { getCookie } from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ksp-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  activityPageMode = activityPageMode;
  positions$!: Observable<PositionType[]>;
  licenseTypes: ListData[] = staffLicenseTypes;
  searchNotFound = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    activitySearch: [],
  });

  schoolId = getCookie('schoolId');
  displayedColumns: string[] = [
    'id',
    'licenseID',
    'idcardno',
    'name',
    'releaseDate',
    'finishedDate',
    'startdate',
    'enddate',
    'edit',
    'view',
  ];

  dataSource = new MatTableDataSource<SchStaff>();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private service: StaffService,
    private loaderService: LoaderService
  ) {
    this.positions$ = this.service.getPositionTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(filter: any) {
    const payload = {
      licenseno: filter.licenseno,
      name: filter.name,
      cardno: filter.cardno,
      teachinglevel: filter.teachinglevel,
      position: filter.position,
      schoolid: `${this.schoolId}`,
      offset: '0',
      row: '100',
    };

    this.service.searchStaffs(payload).subscribe((res) => {
      if (res) {
        res.map((i: any) => {
          if (i && i.hiringinfo) {
            const temp = JSON.parse(i.hiringinfo);
            i.startdate = temp.startDate;
            i.enddate = temp.endDate;
            this.searchNotFound = false;
          }
        });
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }

      this.dataSource.data = res;
      //console.log('res = ', res);
    });
  }

  clear() {
    this.dataSource.data = [];
    this.searchNotFound = false;
  }

  edit(pageType: any, staffId: number, requestid: number) {
    this.router.navigate(['/activity', 'detail', pageType, staffId], {
      queryParams: { requestid: requestid },
    });
  }

  view(staffId: number, requestid: number) {
    this.router.navigate(['/activity', 'view-detail', staffId], {
      queryParams: { requestid: requestid },
    });
  }
}

enum activityPageMode {
  view,
  edit,
}
