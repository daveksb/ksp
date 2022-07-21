import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPerformanceListComponent } from './test-performance-list/test-performance-list.component';
import { TestPerformanceDetailComponent } from './test-performance-detail/test-performance-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TestPerformanceListComponent, TestPerformanceDetailComponent],
  exports: [TestPerformanceListComponent, TestPerformanceDetailComponent],
})
export class UniServiceFeatureTestPerformanceResultModule {}
