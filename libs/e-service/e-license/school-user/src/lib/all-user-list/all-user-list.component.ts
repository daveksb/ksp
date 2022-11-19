import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolUserDetailComponent } from '@ksp/e-service/dialog/school-user-detail';
import { SchUser } from '@ksp/shared/interface';
import { SchoolInfoService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-all-user-list',
  templateUrl: './all-user-list.component.html',
  styleUrls: ['./all-user-list.component.scss'],
})
export class AllUserListComponent implements OnInit {
  schoolInfo: any;
  xxx: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private schoolInfoService: SchoolInfoService
  ) {}

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>(data);

  ngOnInit(): void {
    this.checkSchool();
  }

  checkSchool() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      this.schoolInfo = params;
      console.log('xxx = ', this.schoolInfo);
      this.xxx = this.schoolInfoService.searchSchUsers({
        schoolid: '1011360108',
      });

      console.log('activeUsers = ', this.xxx);
    });
  }

  back() {
    this.router.navigate(['/school', 'user-detail']);
  }

  viewDetail() {
    this.dialog.open(SchoolUserDetailComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
    });
  }
}

export const data = [
  {
    id: 1,
    idcardno: '123',
    firstnameth: 'xxx',
    lastnameth: 'xxx',
    requeststatus: 'yyy',
    requestdate: '1/1/2565',
    updatedate: '1/1/2565',
  },
];

export const column = [
  'id',
  'idcardno',
  'name',
  'requeststatus',
  'requestdate',
  'updatedate',
  'view',
];
