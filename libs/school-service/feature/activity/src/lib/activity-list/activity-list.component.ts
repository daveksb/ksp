import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StaffService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    activitySearch: [],
  });

  schoolId = '0010201056';
  displayedColumns: string[] = [
    'id',
    'idcardno',
    'name',
    'startdate',
    'enddate',
    'edit',
    'view',
  ];

  dataSource = new MatTableDataSource<staffInfo>();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private service: StaffService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search() {
    const payload = {
      schoolid: `${this.schoolId}`,
    };
    this.service.searchStaffsFromSchoolId(payload).subscribe((res) => {
      res.map((i: any) => {
        const temp = parseJson(i.hiringinfo);
        i.startdate = temp.startDate;
        i.enddate = temp.endDate;
      });

      this.dataSource.data = res;
      //console.log('res = ', res);
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  view(staffId: number) {
    this.router.navigate(['/', 'activity', 'detail', staffId]);
  }
}

export interface staffInfo {
  id: number;
  idcardno: string;
  firstnameth: string;
  lastnameth: string;
  startdate: string;
  enddate: string;
}
