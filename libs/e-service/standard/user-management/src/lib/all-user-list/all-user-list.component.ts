import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolUserDetailComponent } from '@ksp/e-service/dialog/school-user-detail';
import { KspPaginationComponent } from '@ksp/shared/interface';
import { EUniService } from '@ksp/shared/service';
import { stringToThaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';

@Component({
  selector: 'ksp-all-user-list',
  templateUrl: './all-user-list.component.html',
  styleUrls: ['./all-user-list.component.scss'],
})
export class AllUserListComponent extends KspPaginationComponent implements OnInit {
  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private euniservice: EUniService) {
      super();
    }

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>([]);
  unidata: any;

  ngOnInit(): void {
    localForage.getItem('uniseleced').then((res: any) => {
      if (res) {
        console.log(res)
        this.unidata = res;
        this.search();
      }
    });
  }

  override search() {
    this.euniservice.getUserlistbyUniid(
      { 
        uniid: this.unidata?.uniid,
        row: this.pageEvent.pageSize,
        offset: 0
       }).subscribe(res => {
      if (res) {
        this.pageEvent.length = res.countrow;
        this.dataSource = res.datareturn.map((data: any) => {
          data.isuseractive = data.isuseractive == '1' ? 'ใช้งาน' : 'ไม่ใช้งาน';
          data.createdate = data.createdate ? stringToThaiDate(data.createdate) : '';
          data.updatedate = data.updatedate ? stringToThaiDate(data.updatedate) : '';
          return data;
        });
        console.log(this.dataSource)
      }
    })
  }

  back() {
    this.router.navigate(['/uni', 'new-user']);
  }

  viewDetail(item: any) {
    this.euniservice.getUserById({ id: item.id }).subscribe( res => {
      if (res) {
        this.dialog.open(SchoolUserDetailComponent, {
          width: '1200px',
          height: '100vh',
          position: {
            top: '0px',
            right: '0px',
          },
          data: {
            userinfo: res
          }
        });
      }
    })
  }

  ngOnDestroyed() {
    localForage.removeItem('uniselected')
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
