import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { SchStaff } from '@ksp/shared/interface';
import { getCookie } from '@ksp/shared/utility';
import { StaffService } from '@ksp/shared/service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'school-service-staff-search-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './staff-search-dialog.component.html',
  styleUrls: ['./staff-search-dialog.component.scss'],
})
export class StaffSearchDialogComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<SchStaff>();
  schoolId = getCookie('schoolId');
  searchNotFound = false;
  selectedStaff = '';

  form = this.fb.group({
    cardno: [],
    name: [],
  });

  displayedColumns: string[] = ['select', 'idcardno', 'name'];

  constructor(
    private fb: FormBuilder,
    private service: StaffService,
    public dialogRef: MatDialogRef<StaffSearchDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onItemChange(staff: any) {
    this.selectedStaff = staff;
    //console.log('universityCode = ', universityCode);
  }

  search(filter: any) {
    //console.log('filter = ', filter);
    //console.log('school id = ', this.schoolId);
    const payload = {
      licenseno: null,
      name: filter.name,
      cardno: filter.cardno,
      teachinglevel: null,
      position: null,
      schoolid: `${this.schoolId}`,
      offset: '0',
      row: '100',
    };

    this.service.searchStaffs(payload).subscribe((res) => {
      if (res) {
        res.map((i: any) => {
          if (i && i.hiringinfo) {
            const temp = JSON.parse(i.hiringinfo);
            i.startdate = temp.startDate;
            i.enddate = temp.endDate;
            this.searchNotFound = false;
          }
        });
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }

      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      const sortState: Sort = { active: 'id', direction: 'desc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  clear() {
    this.dataSource.data = [];
    this.form.reset();
    this.searchNotFound = false;
  }

  confirm() {
    this.dialogRef.close(this.selectedStaff);
    console.log('this.selectedStaff = ', this.selectedStaff);
  }
}
