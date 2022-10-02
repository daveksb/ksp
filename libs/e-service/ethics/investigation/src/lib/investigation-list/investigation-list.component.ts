import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TopNavComponent } from '@ksp/shared/menu';
import { AccusationSearchComponent } from '@ksp/shared/search';

@Component({
  templateUrl: './investigation-list.component.html',
  styleUrls: ['./investigation-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TopNavComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    AccusationSearchComponent,
  ],
})
export class InvestigationListComponent implements OnInit {
  //mode!: EthicsMode;
  displayedColumns: string[] = columns;

  form = this.fb.group({
    ethicSearch: [],
  });

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    /* this.route.data.subscribe((res) => {
      this.mode = res['ethicsMode'];
      console.log('res = ', res);
    }); */
    console.log(' ');
  }

  onSubmit(id: any) {
    this.router.navigate(['investigation', 'detail', id]);
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
