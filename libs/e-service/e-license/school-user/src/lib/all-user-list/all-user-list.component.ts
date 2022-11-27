import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolUserDetailComponent } from '@ksp/e-service/dialog/school-user-detail';
import { SchUser } from '@ksp/shared/interface';
import { ESchStaffService, SchoolInfoService } from '@ksp/shared/service';
import { mapSchUserStatus } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import localForage from 'localforage';

@UntilDestroy()
@Component({
  selector: 'ksp-all-user-list',
  templateUrl: './all-user-list.component.html',
  styleUrls: ['./all-user-list.component.scss'],
})
export class AllUserListComponent implements OnInit {
  schoolInfo: any;
  schoolId: any;
  searchNotFound = false;
  mapSchUserStatus = mapSchUserStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    bureau: [],
    schoolName: [],
    schoolAddress: [],
  });

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private schStaffService: ESchStaffService,
    private fb: FormBuilder
  ) {}

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<SchUser>();

  ngOnInit(): void {
    this.checkSchool();
    localForage.getItem('schoolDetail').then((res: any) => {
      this.form.controls.bureau.patchValue(res.bureau);
      this.form.controls.schoolName.patchValue(res.schoolName);
      this.form.controls.schoolAddress.patchValue(res.schoolAddress);
      //console.log('xxx = ', res);
    });
    this.form.disable();
  }

  checkSchool() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (Number(params['schoolId'])) {
        this.schoolId = String(params['schoolId']);
      }
      this.searchSchool();
    });
  }

  searchSchool() {
    const payload = {
      schoolid: this.schoolId,
      schoolname: null,
      name: null,
      offset: '0',
      row: '500',
    };

    this.schStaffService.searchSchStaffs(payload).subscribe((res) => {
      if (res && res.length) {
        this.dataSource.data = res;
        this.searchNotFound = false;
      } else {
        this.searchNotFound = true;
      }
    });
  }

  back() {
    this.router.navigate(['/school', 'user-detail']);
  }

  viewDetail(id: number) {
    this.dialog.open(SchoolUserDetailComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        userid: id,
      },
    });
  }
}

export const column = [
  'id',
  'idcardno',
  'name',
  'requeststatus',
  'requestdate',
  //'updatedate',
  'view',
];
