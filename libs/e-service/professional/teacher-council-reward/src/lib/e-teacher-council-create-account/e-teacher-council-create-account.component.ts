import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from '@ksp/shared/service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-teacher-council-create-account',
  templateUrl: './e-teacher-council-create-account.component.html',
  styleUrls: ['./e-teacher-council-create-account.component.scss'],
})
export class ETeacherCouncilCreateAccountComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns = [
    'select',
    'order',
    'accountGroup',
    'careerType',
    'result',
    'createDate',
    'view',
    'accountList',
    'book',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {}
}
