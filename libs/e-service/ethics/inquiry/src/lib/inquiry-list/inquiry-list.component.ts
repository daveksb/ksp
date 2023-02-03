import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TopNavComponent } from '@ksp/shared/menu';
import { AccusationSearchComponent } from '@ksp/shared/search';
import { LoaderService } from '@ksp/shared/service';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    AccusationSearchComponent,
    MatProgressSpinnerModule,
  ],
})
export class InquiryListComponent {
  //mode!: EthicsMode;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = columns;

  form = this.fb.group({
    ethicSearch: [],
  });

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {}

  onSubmit(id: any) {
    this.router.navigate(['inquiry', 'detail', id]);
  }
}

export const columns = [
  'order',
  'id',
  'receiveDate',
  'blackNumber',
  'redNumber',
  'personId',
  'name',
  'process',
  'status',
  'lastUpdate',
  'edit',
  'view',
];

export interface AccusationList {
  order: number;
  id: string;
  receiveDate: string;
  blackNumber: string;
  redNumber: string;
  personId: string;
  name: string;
  process: string;
  status: string;
  lastUpdate: string;
  edit: string;
  view: string;
}
