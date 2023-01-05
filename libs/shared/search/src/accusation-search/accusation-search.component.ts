import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  AccusationList,
  columns,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';

@Component({
  selector: 'ksp-ethics-accusation-search',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
  providers: providerFactory(AccusationSearchComponent),
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
  ],
})
export class AccusationSearchComponent
  extends KspFormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  override form = this.fb.group({
    listNumber: [],
    eraBe: [],
    fromToDate: [],
    blackNumber: [],
    redNumber: [],

    accusedLicenseNumber: [],
    accusedPersonId: [],
    accusedFirstname: [],
    accusedLastname: [],

    accuserLicenseNumber: [],
    accuserPersonId: [],
    accuserFirstname: [],
    accuserLastname: [],
  });
  @Input() showAddButton = false;
  @Output() submited = new EventEmitter<boolean>();
  dataSource = new MatTableDataSource<AccusationList>();
  displayedColumns: string[] = columns;
  constructor(
    private fb: FormBuilder,
    private service: EthicsService,
    public router: Router
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onClickSearch() {
    const payload = {
      ethicsno: '',
      accusationblackno: '',
      resultredno: '',
      firstname: '',
      lastnameth: '',
      idcardno: '',
      firstnameinfo: '',
      lastnamethinfo: '',
      idcardnoinfo: '',
      licensenoinfo: '',
      offset: '0',
      row: '10',
    };
    this.service.searchEthicssearch(payload).subscribe((res: any) => {
      res.forEach((item: any) => {
        item.createdate = thaiDate(new Date(`${item.createdate}`));
        item.updatedate = thaiDate(new Date(`${item.updatedate}`));
      });
      this.dataSource.data = res;
    });
  }
  createNew() {
    this.router.navigate(['accusation', 'detail']);
  }
  onClickRow(row: any) {
    this.submited.emit(row.id);
  }
  clear() {
    this.form.reset();
    this.dataSource.data = [];
  }
}
