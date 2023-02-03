import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule],
  selector: 'ksp-request-license-approve-license-table',
  templateUrl: './request-license-approve-license-table.component.html',
  styleUrls: ['./request-license-approve-license-table.component.scss'],
})
export class RequestLicenseApproveLicenseTableComponent
  implements OnInit, OnChanges
{
  @Input() isKmv = false;
  @Input() data: any[] = [];
  @Output() listOpen = new EventEmitter();
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.isKmv
      ? (this.displayedColumns = [
          'order',
          'licenseType',
          'count',
          'viewDetail',
          'approve',
          'unApprove',
          'urgent',
        ])
      : (this.displayedColumns = ['order', 'licenseType', 'count']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }

  viewDetail(item: any) {
    //console.log(item);
    this.listOpen.emit(item.order);
  }
}
