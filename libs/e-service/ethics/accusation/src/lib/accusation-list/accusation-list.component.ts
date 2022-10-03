import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccusationList, columns } from '@ksp/shared/interface';
import { TopNavComponent } from '@ksp/shared/menu';
import { AccusationSearchComponent } from '@ksp/shared/search';

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
  ],
})
export class AccusationListComponent implements OnInit {
  //mode!: EthicsMode;
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = columns;

  form = this.fb.group({
    ethicSearch: [],
  });

  constructor(
    public router: Router,
    //private route: ActivatedRoute,
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
    this.router.navigate(['accusation', 'detail', id]);
  }
}
