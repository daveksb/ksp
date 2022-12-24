import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EsSearchPayload, SchRequestSearchFilter } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-osoi-ranking-list',
  templateUrl: './osoi-ranking-list.component.html',
  styleUrls: ['./osoi-ranking-list.component.scss'],
})
export class OsoiRankingListComponent implements AfterViewInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  searchNotFound = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    search: [],
  });

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private fb: FormBuilder
  ) {}

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
      process: '1',
      status: '1',
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
      //console.log(res);
      if (res) {
        const data = res.map((i) => {
          const osoiinfo = JSON.parse(i.osoiinfo || '{}');
          return {
            ...i,
            ...{
              /* workname: JSON.parse(i.rewardname || '{}'), */
              workname: osoiinfo?.rewardname,
            },
          };
        });
        this.dataSource.data = data;
        this.searchNotFound = false;
      } else {
        this.clear();
        this.searchNotFound = true;
      }
      // this.dataSource.sort = this.sort;

      // const sortState: Sort = { active: 'id', direction: 'desc' };
      // this.sort.active = sortState.active;
      // this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    });
  }

  clear() {
    this.form.reset();
    this.dataSource.data = [];
    this.searchNotFound = false;
  }

  cancelRequest() {
    this.router.navigate(['one-school-one-innovation', 'objection']);
  }

  view() {
    this.router.navigate(['/one-school-one-innovation', 'ranking-detail']);
  }
}

const column = [
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
