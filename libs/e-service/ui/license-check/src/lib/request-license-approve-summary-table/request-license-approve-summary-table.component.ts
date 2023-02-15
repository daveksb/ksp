import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'e-service-request-license-approve-summary-table',
  standalone: true,
  templateUrl: './request-license-approve-summary-table.component.html',
  styleUrls: ['./request-license-approve-summary-table.component.scss'],
  imports: [MatTableModule],
})
export class RequestLicenseApproveSummaryTableComponent
  implements OnInit, OnChanges
{
  @Input() data: any = [];
  displayedColumns: string[] = ['result', 'count'];
  dataSource = new MatTableDataSource<any>();

  //constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }
}
