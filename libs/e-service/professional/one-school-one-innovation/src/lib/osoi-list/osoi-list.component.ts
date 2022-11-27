import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestType } from '@ksp/shared/constant';
import { EsSearchPayload, SchRequestSearchFilter } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-osoi-list',
  templateUrl: './osoi-list.component.html',
  styleUrls: ['./osoi-list.component.scss'],
})
export class OsoiListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search(params: Partial<SchRequestSearchFilter>) {
    let payload: EsSearchPayload = {
      systemtype: '2',
      requesttype: '40',
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: params.idcardno,
      passportno: null,
      process: null,
      status: params.status,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      offset: '0',
      row: '1000',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
      // this.dataSource.sort = this.sort;

      // const sortState: Sort = { active: 'id', direction: 'desc' };
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  cancelRequest() {
    this.router.navigate(['one-school-one-innovation', 'objection']);
  }

  view(id: number) {
    this.router.navigate(['/one-school-one-innovation', 'detail', id]);
  }
}

export const column = [
  'order',
  'requestno',
  'schoolid',
  'schoolname',
  'workname',
  'status',
  'process',
  'processupdatedate',
  'requestdate',
  'verify',
  'request',
  'edit',
];
