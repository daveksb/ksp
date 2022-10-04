import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  template: ``,
  standalone: true,
})
export abstract class KspPaginationComponent {
  pageEvent: PageEvent = {
    previousPageIndex: 1,
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  tableRecord = {
    offset: 0,
    row: 10,
  };
  pageSizeOptions = [5, 10, 25, 100]
  onPaginatorEvent(e: PageEvent) {
    this.pageEvent = {
      ...e,
      pageIndex: this.pageEvent?.pageSize === e?.pageSize ? e?.pageIndex : 0,
    };
    this.tableRecord = {
      offset: this.pageEvent.pageIndex * this.pageEvent.pageSize,
      row: this.pageEvent.pageSize,
    };
    this.search();
  }
  search() {}
}
