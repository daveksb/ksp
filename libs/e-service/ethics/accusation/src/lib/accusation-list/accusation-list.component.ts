import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccusationList, columns } from '@ksp/shared/interface';
import { TopNavComponent } from '@ksp/shared/menu';
import { AccusationSearchComponent } from '@ksp/shared/search';
import { LoaderService } from '@ksp/shared/service';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './accusation-list.component.html',
  styleUrls: ['./accusation-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    AccusationSearchComponent,
    MatProgressSpinnerModule
  ],
})
export class AccusationListComponent {
  //mode!: EthicsMode;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = columns;

  form = this.fb.group({
    ethicSearch: [],
  });

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {}

  onSubmit(id: any) {
    this.router.navigate(['accusation', 'detail', id]);
  }
}
